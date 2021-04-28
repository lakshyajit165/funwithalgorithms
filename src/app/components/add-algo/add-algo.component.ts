import { Component, OnInit } from '@angular/core';
import { ImageuploadService } from '../../services/imageupload.service';
import { IProblem } from '../../model/IProblem';
import { AlgoService } from '../../services/algo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-algo',
  templateUrl: './add-algo.component.html',
  styleUrls: ['./add-algo.component.css']
})
export class AddAlgoComponent implements OnInit {

  image: File;
  imguploadstatus: boolean = false;
  imguploaderror: boolean = false;
  filenameerror: boolean = false;
  imguploadsuccess: boolean = false;
  addproblemstatus: boolean = false;
  addproblemerror: boolean = false;

  title: string = '';
  description: string = '';
  imageurl: string = '';
  logic: string = '';
  pseudocode: string = '';
  tags: string[] = [];
  tagslist: string[] = [];
  difficulty: string = '';

  titlechangestatus: boolean = false;
  descriptionchangestatus: boolean = false;
  logicchangestatus: boolean = false;
  pseudocodechangestatus: boolean = false;
  tagschangestatus: boolean = false;
  difficultychangestatus: boolean = false;
  
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
    private imageUploadService: ImageuploadService,
    private algoService: AlgoService,
    private router: Router
  ) { }

   
  ngOnInit(): void {
    this.algoService.getCategoryList().subscribe(res => {
      this.tagslist = res['categories'];
      
    })
  }

  onChangeImage(event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    
    // check for spaces - file names can't contain spaces
    // console.log(FILE.name);

    if(FILE.name.indexOf(' ') >= 0){
      this.filenameerror = true;
    //  console.log("File name should not contain spaces!");
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

    this.addproblemerror = false;
    this.addproblemstatus = true;

    if(this.validateTitle() && this.validateDescription && this.validateLogic() 
    && this.validateLogic() && this.validatePseudoCode() && this.validateTags() && this.validateDifficulty()){

      this.problem.title = this.title;
      this.problem.description = this.description;
      this.problem.imageurl = this.imageurl;
      this.problem.logic = this.logic;
      this.problem.pseudocode = this.pseudocode;
      // this.problem.tags = this.tags.replace(/ /g, "").toUpperCase().split(',');
      this.problem.tags = this.tags;
      this.problem.difficulty = this.difficulty.toUpperCase();

      // console.log(this.problem);

      this.algoService.addAlgo(this.problem).subscribe(res => {

        this.addproblemstatus = false;
        if(res){
          this.router.navigate(['/portal/admin/home']);
        }

      }, err => {
        
        this.addproblemerror = true;
        this.addproblemstatus = false;
        
      })
      
    } else {

      this.addproblemerror = true;
      this.addproblemstatus = false;
    
    }
    // process tags
    // console.log(this.tags.replace(/ /g, "").toUpperCase().split(','));
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

  validateTags(): boolean {
    return this.tags.length !== 0;
  }

  difficultyChange(event): void {
    this.difficultychangestatus = true;
  }

  validateDifficulty(): boolean {
    return this.difficulty !== '';
  }



 
}
