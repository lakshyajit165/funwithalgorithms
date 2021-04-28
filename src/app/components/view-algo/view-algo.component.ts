import { Component, OnInit } from '@angular/core';
import { AlgoService } from '../../services/algo.service';
import { Router } from '@angular/router';
import { IAlgoData } from '../../model/IAlgoData';
import { Data } from '../../providers/data.provider';
import { AlgoCategory } from '../../providers/algocategory.provider';
import { stringList } from 'aws-sdk/clients/datapipeline';
import { Location } from "@angular/common";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-view-algo',
  templateUrl: './view-algo.component.html',
  styleUrls: ['./view-algo.component.css']
})
export class ViewAlgoComponent implements OnInit {

  algolist: object;
  page: number = 0;
  size: number = 5;
  loadingerror: boolean = false;
  loadingstatus: boolean = false;
  tags: string = '';
  categories: object[];

  deleteloading: boolean = false;
  deletestatus: boolean = false;
  deleteerror: boolean = false;

  currentpage: number;
  totalpages: number;

  
  categorylist: string[];
  categoryerror: boolean = false;
  algocategory: string = '';
  categoryfilter: boolean = false;

  algolistempty: boolean = false;

  isAdminLoggedIn: boolean = false;

  constructor(
    private algoService: AlgoService,
    private location: Location,
    private router: Router,
    private data: Data,
    private algoCategory: AlgoCategory,
    private cookieService: CookieService
  ) { 
   
  }

  ngOnInit(): void {

    // get list of categories

    // check if category is present in the category provider
    if(this.algoCategory.category === '' || this.algoCategory.category === undefined) {
      this.tags = '';
    }else{
      this.tags = this.algoCategory.category;
      this.algocategory = this.algoCategory.category;

      // make categoryfilter = true
      this.categoryfilter = true;
    }

    this.checkLoginStatus();
    
    // get algorithms 
    this.getAlgorithms(this.tags);
    this.getCategoryList();
    
    
   
  }

  getAlgorithms(tags: string): void {
    this.loadingerror = false;
    this.loadingstatus = true;
    this.deleteloading = false;
    this.deletestatus = false;
    this.deleteerror = false;
    this.algolistempty = false;

    // check if admin is logged in, else show all algorithms to user
    if(this.isAdminLoggedIn) {

      this.algoService.getAlgorithmsAddedByMe(tags, this.page, this.size).subscribe(res => {
      
        this.loadingstatus = false;
        this.algolist = res;
        this.currentpage = res['currentPage'];
        this.totalpages = res['totalPages'];
  
        if(res['algorithms'].length === 0)
          this.algolistempty = true;
          
        // console.log(res);
      
      }, err => {
        
        this.loadingstatus = false;
        this.loadingerror = true;
      
      });

    } else {

      this.algoService.getAlgorithms(tags, this.page, this.size).subscribe(res => {
      
        this.loadingstatus = false;
        this.algolist = res;
        this.currentpage = res['currentPage'];
        this.totalpages = res['totalPages'];
  
        if(res['algorithms'].length === 0)
          this.algolistempty = true;
          
        // console.log(res);
      
      }, err => {
        
        this.loadingstatus = false;
        this.loadingerror = true;
      
      });
    }

    
  }

  getAlgoByCategory(): void {
    // console.log(this.algocategory);
    if(this.algocategory === '' || this.algocategory === undefined){
      this.categoryfilter = false;
      this.getAlgorithms('');
    }else{
      this.categoryfilter = true;
      
      // add category data to provider
      this.algoCategory.category = this.algocategory;

      this.getAlgorithms(this.algocategory);
    }
      
    
  }

  getCategoryList(): void {
    this.categoryerror = false;
    this.algoService.getCategoryList().subscribe(data => {
      this.categorylist = data['categories'];
      
    }, err => {
      this.categoryerror = true;
    });
  }

  clearFilter(): void {
    this.categoryfilter = false;
    this.algocategory = '';
    this.algoCategory.category = this.algocategory;
    this.getAlgorithms('');
  }

  viewAlgo(algo: IAlgoData): void{
   // console.log(algo);
   this.data.algo = algo;

   // route based on request from user/admin to different components
    if(this.location.path() === "/portal/admin/home/algorithms")
        this.router.navigate(['/portal/admin/home/algorithms/'+algo.id]);
    else
        this.router.navigate(['/home/algorithms/'+algo.id]);
    
  }

  getClass(cls: string): string{
    return cls === "EASY" ? 'green' : (cls === "MEDIUM" ? 'yellow' : 'red');
  }

  editAlgo(algo: IAlgoData): void {
    this.data.algo = algo;
    this.router.navigate(['/portal/admin/home/algorithms/edit/'+algo.id]);
  }

  deleteAlgo(): void {
    this.deleteloading = true;
    
    this.algoService.deleteAlgo(this.cookieService.get('id')).subscribe(res => {
      this.deleteloading = false;
      this.deletestatus = true;
      this.cookieService.delete('id');
    }, err => {
      this.deleteloading = false;
      this.deleteerror = true;
    });

  }

  closeDialog() {
    if(this.deletestatus){
      this.getAlgorithms(this.algocategory);
    }
  }

  getId(id: string){
    this.cookieService.set('id', id);
  }

  nextPage() {
    this.page++;
    if(this.page < this.totalpages)
      this.getAlgorithms(this.algocategory);
  }

  previousPage(){
    this.page--;
    if(this.page >= 0)
      this.getAlgorithms(this.algocategory);
  }

  checkFirstPage(): boolean {
    return this.currentpage === 0;
  }

  checkLastPage(): boolean {
    return this.currentpage + 1 === this.totalpages || this.currentpage === this.totalpages;
  }

  checkLoginStatus(): void{
    if(this.location.path() === "/portal/admin/home/algorithms" || !this.isNULLEMPTYORUNDEFINED(this.cookieService.get('fwa-token')))
      this.isAdminLoggedIn = true;
  }

  isNULLEMPTYORUNDEFINED(token): boolean {
    if(token === null || token === '' || token === undefined)
      return true;
    return false;
  }

}
