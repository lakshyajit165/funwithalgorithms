import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlgoData } from 'src/app/model/IAlgoData';
import { IProblem } from 'src/app/model/IProblem';
import { Data } from 'src/app/providers/data.provider';
import { AlgoService } from 'src/app/services/algo.service';
import { ImageuploadService } from 'src/app/services/imageupload.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  algo: IAlgoData;
  id: string = '';

  image: File;
  imguploadstatus: boolean = false;
  imguploaderror: boolean = false;
  filenameerror: boolean = false;
  imguploadsuccess: boolean = false;
  editproblemstatus: boolean = false;
  editproblemerror: boolean = false;

  retrievalError: boolean = false;
  loading: boolean = false;

  title: string = '';
  description: string = '';
  imageurl: string = '';
  logic: string = '';
  pseudocode: string = '';
  //tags: string = '';

  tagslist: string[] = [];
  tags: string[] = [];

  difficulty: string = '';

  titlechangestatus: boolean = false;
  descriptionchangestatus: boolean = false;
  logicchangestatus: boolean = false;
  pseudocodechangestatus: boolean = false;
  tagschangestatus: boolean = false;
  difficultychangestatus: boolean = false;

  difflevels = ["EASY", "MEDIUM", "HARD"];
  
  s3link: string = 'https://funwithalgo.s3.ap-south-1.amazonaws.com/';

  problem: IProblem = {
    title: '',
    description: '',
    imageurl: '',
    logic: '',
    pseudocode: '',
    tags: [],
    difficulty: ''

  }
  

  constructor(
    private data: Data,
    private imageUploadService: ImageuploadService,
    private algoService: AlgoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

 
    

  }

  ngOnInit(): void {

       // check if data is null or undefined
    // if not null/ud, extract data from the "Data" provider and assign it to fields
    // else get algo by id using params from route and assign it to fields

     // extract id first
     this.id = this.activatedRoute.snapshot.paramMap.get('id');

     // set loading to true and retrieval error to false;
     this.loading = true;
     this.retrievalError = false;

      // check if this.data.algo is undefined or null, if so, get algorithm by id from service.
    if(this.data.algo === undefined || this.data.algo === null){

      this.algoService.getAlgorithmById(this.id).subscribe(res => {

        // set loading to false
        this.loading = false;

        this.algo = res;

        // assign values
        this.assignValues(this.algo);
        
        // console.log(res);
      
      }, err => {
        
        this.loading = false;
        
        this.retrievalError = true;
      
      });

    }else{
      this.loading = false;
      this.id = this.data.algo.id;
      this.algo = this.data.algo;

      // assign values
      this.assignValues(this.algo);
    }

    // get category list

    this.algoService.getCategoryList().subscribe(res => {
      this.tagslist = res['categories'];
      
    })
    
     
  }

  assignValues(algo: IAlgoData) : void {
    this.title = algo.title;
    this.description = algo.description;
    this.imageurl = algo.imageurl;
    this.logic = algo.logic;
    this.pseudocode = algo.pseudocode;
    // this.tags = algo.tags.toString().toLowerCase();
    this.tags = algo.tags.toString().split(',');
    this.difficulty = algo.difficulty;

  }

  onChangeImage(event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    
    // check for spaces - file names can't contain spaces
    // console.log(FILE.name);

    if(FILE.name.indexOf(' ') >= 0){
      this.filenameerror = true;
      // console.log("File name should not contain spaces!");
    }else{
      this.filenameerror = false;
      this.image = FILE;
    }
    

    
  }


  uploadImage() {
    const imageForm = new FormData();
    
    // check for no file selection
    if(this.image){

      imageForm.append('image', this.image);
      this.imageUploadService.fileUpload(imageForm).subscribe(res => {
        // console.log(res);
        this.imguploaderror = false;
        this.imguploadsuccess = true;
        this.imageurl = this.s3link+res['image'];
        
      }, err => {
        this.imguploaderror = true;
      });


    }else{

      this.imguploaderror = true;

    }
   
  }

  onSubmit() {

    this.editproblemerror = false;
    this.editproblemstatus = true;

    if(this.validateTitle() && this.validateDescription && this.validateLogic() 
    && this.validateLogic() && this.validatePseudoCode() && this.validateTags() && this.validateDifficulty()){

      this.problem.title = this.title;
      this.problem.description = this.description;
      this.problem.imageurl = this.imageurl;
      this.problem.logic = this.logic;
      this.problem.pseudocode = this.pseudocode;
      this.problem.tags = this.tags;
      this.problem.difficulty = this.difficulty.toUpperCase();

      // console.log(this.problem);

      this.algoService.editAlgo(this.problem, this.id).subscribe(res => {

        this.editproblemstatus = false;
        if(res){
          this.router.navigate(['/portal/admin/home/algorithms']);
        }

      }, err => {
        
        this.editproblemerror = true;
        this.editproblemstatus = false;
        
      })
      
    } else {

      this.editproblemerror = true;
      this.editproblemstatus = false;
    
    }

  }

   // check for undefined algo
   checkAlgo(): boolean {
    return this.algo === undefined || this.algo === null;
  }

  // to check if algo is empty, display the error message
  errorRetrievingAlgo(): boolean {
    if(this.algo === undefined || this.algo === null){
      return true;
    }
    return false;
  }


  titleChange(event): void{
    this.titlechangestatus = true;
  }

  validateTitle(): boolean {
    return this.title !== '';
  }

  descriptionChange(event): void {
    this.descriptionchangestatus = true;
  }

  validateDescription(): boolean {
    return this.description !== '';
  }

  logicChange(event): void {
    this.logicchangestatus = true;
  }

  validateLogic(): boolean {
    return this.logic !== '';
  }

  pseudocodeChange(event): void {
    this.pseudocodechangestatus = true;
  }

  validatePseudoCode(): boolean {
    return this.pseudocode !== '';
  }

  tagsChange(event): void {
    this.tagschangestatus = true;
  }

  validateTags(): boolean {
    return this.tags.length !== 0;
  }

  checkSelected(tagname: string): boolean {
    return this.tags.filter(ele => ele === tagname).length !== 0 ? true : false
  }
  //temptags: string[] = [];
  tagsListChange(event, singletag): void {
    if(singletag){
      // check if tag already exists
      // yes, remmove from array
      // no, add to array
      if(this.tags.filter(ele => ele === singletag).length !== 0)
        this.tags = this.tags.filter(ele => ele !== singletag);
      else
        this.tags.push(singletag);
    }
    // console.log(this.tags);
    this.tagschangestatus = true;
  }

  difficultyChange(event): void {
    this.difficultychangestatus = true;
  }

  validateDifficulty(): boolean {
    return this.difficulty !== '';
  }



}
