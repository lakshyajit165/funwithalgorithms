import { Component, OnInit } from '@angular/core';
import { IAlgoData } from 'src/app/model/IAlgoData';
import { Data } from '../../providers/data.provider';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlgoService } from '../../services/algo.service';

@Component({
  selector: 'app-single-algo',
  templateUrl: './single-algo.component.html',
  styleUrls: ['./single-algo.component.css']
})
export class SingleAlgoComponent implements OnInit {

  algo: IAlgoData;
  id: string = '';
  retrievalError: boolean = false;
  loading: boolean = false;

  constructor(
    private data: Data,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private algoService: AlgoService
  ) { 
    
  }

  ngOnInit(): void {
    
    // extract id first
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    // set loading to true;
    this.loading = true;
    
    // check if this.data.algo is undefined or null, if so, get algorithm by id from service.
    if(this.data.algo === undefined || this.data.algo === null){

      this.algoService.getAlgorithmById(this.id).subscribe(res => {

        // set loading to false
        this.loading = false;

        this.algo = res;
        
        // console.log(res);
      
      }, err => {
        
        this.loading = false;
        
        this.retrievalError = true;
      
      });

    }else{
      this.loading = false;
      this.algo = this.data.algo;
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

}
