import { Component, OnInit } from '@angular/core';
import { AlgoService } from 'src/app/services/algo.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { HostListener } from "@angular/core";


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  // title = 'Population (in millions)';
  //  type = 'BarChart';
  //  data = [
  //     ["2012", 900],
  //     ["2013", 1000],
  //     ["2014", 1170],
  //     ["2015", 1250],
  //     ["2016", 1530]
  //  ];
  //  columnNames = ['Year', 'Asia'];
  //  options = { };
  

  // loading spinner
  public dashboardLoading: boolean = false;

  // for tabulated data
  public algodata = new Map<string, string>();
  public tabledisplay: boolean;

  // for viewport width and height
  screenHeight: number;
  screenWidth: number;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [{ data: [], label: "Problem Count" }];

  public barChartColors: Color[] = [
    { 
      backgroundColor: '#AAE4FF',
      hoverBackgroundColor: '#62CDFF',
      borderColor: '#26ADEC',
      hoverBorderColor: '#1E86B6'
    }
  ]

  public count = [];

  
  

  constructor(
    private algoService: AlgoService
  ) { 
    this.onResize();
  
  }

  ngOnInit(): void {
    this.dashboardLoading = true;
    this.algoService.getCategoryListForDashboard().subscribe(res => {
      this.loadData(res);
      //console.log(this.barChartLabels);
      //console.log(this.barChartData);
    })
  }

  loadData(res: Array<object>): void {
    res.forEach(ele => {
     
      this.barChartLabels.push(ele['_id']);
      this.count.push(ele['count']);
      this.algodata.set(ele['_id'], ele['count']);
      this.dashboardLoading = false;
    })
    this.barChartData[0].data = this.count;
    // res.forEach(ele => {
      
    // });

    //console.log(this.algodata)
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
   this.screenHeight = window.innerHeight;
   this.screenWidth = window.innerWidth;

   // if viewport width is < 1300px, display table, else display graph
   this.tabledisplay = this.screenWidth < 1300 ? true : false;
   // console.log(this.screenHeight, this.screenWidth);
}

 

}
