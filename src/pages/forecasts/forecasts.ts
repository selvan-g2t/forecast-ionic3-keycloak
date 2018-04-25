import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import * as $ from 'jquery';

@Component({
  selector: 'page-forecasts',
  templateUrl: 'forecasts.html'
})
export class Forecasts {
  displayedColumns = ['name', 'amount', 'updated'];
  dataSource = new MatTableDataSource<Element>();

  constructor(
    public navCtrl: NavController
  ) {

  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  user_page_size = parseInt(localStorage.getItem('pgSize'))
  public pSize : number = isNaN(this.user_page_size) ? 10 : this.user_page_size;
  public pagedItems: any[];
  public page :number=1;
  public pageSize;
  public listLength;
  public pageNumber;


  public isLoadingResults:boolean;


  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    setTimeout(()=>{this.setUI()},1)
    window.onresize = ()=>{
      this.setUI()
    }
    this.getData()
  }
  setUI(){
    //debugger
    var h = window.innerHeight
    var headerHeight  = $('.app-header').height();
    var footerHeight  = $('.app-footer').height();
    var pagination    = $('.mat-paginator-container').height();
    var tableHeight   = h - (headerHeight + footerHeight + pagination + 125);
    $('.mat-table').css('height', tableHeight+"px")
    $('.mat-header-row').css('width', $('.mat-table').width()+"px")
    //console.log(tableHeight)
  }
  getData(){
    const data = {"pagingInfo":{"totalRows":24,"pageNumber":1,"pageSize":10,"startingOffset":1,"totalPages":3,"endingOffset":10,"links":null},"searchResults":[{"id":"fef6c41c-b9e3-4773-add6-b470d8b5d8fc","dateCreated":{"dateMilliseconds":1523620117167,"dateFormat":"MMM-dd-yyyy","formattedDate":"Apr-13-2018","formattedDateTime":"Apr-13-2018T11:48:37UTC","year":2018,"month":4,"dayOfMonth":13,"monthName":"April"},"forecastAmount":{"value":0,"dateCurrencySaved":"2018-04-24T17:28:31Z","formattedCurrency":"$0.00","isocurrencyCode":"USD"},"currencyISOCode":"USD","poolId":"f1aafcb6-1dbb-42d9-9f47-7762ca526a79","poolName":"Cortland HVAC X","datePeriodStarts":{"dateMilliseconds":1517501497074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Feb-01-2018","formattedDateTime":"Feb-01-2018T16:11:37UTC","year":2018,"month":2,"dayOfMonth":1,"monthName":"February"},"datePeriodEnds":{"dateMilliseconds":1520179897074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Mar-04-2018","formattedDateTime":"Mar-04-2018T16:11:37UTC","year":2018,"month":3,"dayOfMonth":4,"monthName":"March"},"forecastPeriodId":"a1b9ad49-6989-41da-a283-02676abdd7ab"},{"id":"40b62483-27a8-46e9-850e-f8c8c84b7fae","dateCreated":{"dateMilliseconds":1522846008950,"dateFormat":"MMM-dd-yyyy","formattedDate":"Apr-04-2018","formattedDateTime":"Apr-04-2018T12:46:48UTC","year":2018,"month":4,"dayOfMonth":4,"monthName":"April"},"forecastAmount":{"value":250,"dateCurrencySaved":"2018-04-24T17:28:31Z","formattedCurrency":"$250.00","isocurrencyCode":"USD"},"currencyISOCode":"USD","poolId":"3e28af46-7fb8-47d5-b7ad-0f7076a85306","poolName":"RP-XUR-34","datePeriodStarts":{"dateMilliseconds":1517501497074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Feb-01-2018","formattedDateTime":"Feb-01-2018T16:11:37UTC","year":2018,"month":2,"dayOfMonth":1,"monthName":"February"},"datePeriodEnds":{"dateMilliseconds":1520179897074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Mar-04-2018","formattedDateTime":"Mar-04-2018T16:11:37UTC","year":2018,"month":3,"dayOfMonth":4,"monthName":"March"},"forecastPeriodId":"a1b9ad49-6989-41da-a283-02676abdd7ab"},{"id":"b2487c98-cfaa-4bfc-bdf2-2d7f2c98e67a","dateCreated":{"dateMilliseconds":1522846006947,"dateFormat":"MMM-dd-yyyy","formattedDate":"Apr-04-2018","formattedDateTime":"Apr-04-2018T12:46:46UTC","year":2018,"month":4,"dayOfMonth":4,"monthName":"April"},"forecastAmount":{"value":205,"dateCurrencySaved":"2018-04-24T17:28:31Z","formattedCurrency":"$205.00","isocurrencyCode":"USD"},"currencyISOCode":"USD","poolId":"3e28af46-7fb8-47d5-b7ad-0f7076a85306","poolName":"RP-XUR-34","datePeriodStarts":{"dateMilliseconds":1517501497074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Feb-01-2018","formattedDateTime":"Feb-01-2018T16:11:37UTC","year":2018,"month":2,"dayOfMonth":1,"monthName":"February"},"datePeriodEnds":{"dateMilliseconds":1520179897074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Mar-04-2018","formattedDateTime":"Mar-04-2018T16:11:37UTC","year":2018,"month":3,"dayOfMonth":4,"monthName":"March"},"forecastPeriodId":"a1b9ad49-6989-41da-a283-02676abdd7ab"},{"id":"4eadab10-fb90-4694-99c5-a8b7d5cd7e0b","dateCreated":{"dateMilliseconds":1522846004901,"dateFormat":"MMM-dd-yyyy","formattedDate":"Apr-04-2018","formattedDateTime":"Apr-04-2018T12:46:44UTC","year":2018,"month":4,"dayOfMonth":4,"monthName":"April"},"forecastAmount":{"value":100,"dateCurrencySaved":"2018-04-24T17:28:31Z","formattedCurrency":"$100.00","isocurrencyCode":"USD"},"currencyISOCode":"USD","poolId":"3e28af46-7fb8-47d5-b7ad-0f7076a85306","poolName":"RP-XUR-34","datePeriodStarts":{"dateMilliseconds":1517501497074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Feb-01-2018","formattedDateTime":"Feb-01-2018T16:11:37UTC","year":2018,"month":2,"dayOfMonth":1,"monthName":"February"},"datePeriodEnds":{"dateMilliseconds":1520179897074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Mar-04-2018","formattedDateTime":"Mar-04-2018T16:11:37UTC","year":2018,"month":3,"dayOfMonth":4,"monthName":"March"},"forecastPeriodId":"a1b9ad49-6989-41da-a283-02676abdd7ab"},{"id":"4243ec1a-a529-4fc7-b4d0-d6f515851e7e","dateCreated":{"dateMilliseconds":1522845990857,"dateFormat":"MMM-dd-yyyy","formattedDate":"Apr-04-2018","formattedDateTime":"Apr-04-2018T12:46:30UTC","year":2018,"month":4,"dayOfMonth":4,"monthName":"April"},"forecastAmount":{"value":100,"dateCurrencySaved":"2018-04-24T17:28:31Z","formattedCurrency":"$100.00","isocurrencyCode":"USD"},"currencyISOCode":"USD","poolId":"3055f561-5bca-47e6-9eae-77c8f3ef6855","poolName":"RP-KIQ-65","datePeriodStarts":{"dateMilliseconds":1517501497074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Feb-01-2018","formattedDateTime":"Feb-01-2018T16:11:37UTC","year":2018,"month":2,"dayOfMonth":1,"monthName":"February"},"datePeriodEnds":{"dateMilliseconds":1520179897074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Mar-04-2018","formattedDateTime":"Mar-04-2018T16:11:37UTC","year":2018,"month":3,"dayOfMonth":4,"monthName":"March"},"forecastPeriodId":"a1b9ad49-6989-41da-a283-02676abdd7ab"},{"id":"e4b263d4-a79c-49ab-9e3b-849ed0177ff8","dateCreated":{"dateMilliseconds":1522845989052,"dateFormat":"MMM-dd-yyyy","formattedDate":"Apr-04-2018","formattedDateTime":"Apr-04-2018T12:46:29UTC","year":2018,"month":4,"dayOfMonth":4,"monthName":"April"},"forecastAmount":{"value":100,"dateCurrencySaved":"2018-04-24T17:28:31Z","formattedCurrency":"$100.00","isocurrencyCode":"USD"},"currencyISOCode":"USD","poolId":"3055f561-5bca-47e6-9eae-77c8f3ef6855","poolName":"RP-KIQ-65","datePeriodStarts":{"dateMilliseconds":1517501497074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Feb-01-2018","formattedDateTime":"Feb-01-2018T16:11:37UTC","year":2018,"month":2,"dayOfMonth":1,"monthName":"February"},"datePeriodEnds":{"dateMilliseconds":1520179897074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Mar-04-2018","formattedDateTime":"Mar-04-2018T16:11:37UTC","year":2018,"month":3,"dayOfMonth":4,"monthName":"March"},"forecastPeriodId":"a1b9ad49-6989-41da-a283-02676abdd7ab"},{"id":"421213c4-3b9c-43f0-8f4b-b610045d0980","dateCreated":{"dateMilliseconds":1522839345749,"dateFormat":"MMM-dd-yyyy","formattedDate":"Apr-04-2018","formattedDateTime":"Apr-04-2018T10:55:45UTC","year":2018,"month":4,"dayOfMonth":4,"monthName":"April"},"forecastAmount":{"value":0,"dateCurrencySaved":"2018-04-24T17:28:31Z","formattedCurrency":"$0.00","isocurrencyCode":"USD"},"currencyISOCode":"USD","poolId":"66d9bdc5-f835-4556-ac9b-df1881acb51f","poolName":"RP-JFE-17","datePeriodStarts":{"dateMilliseconds":1517501497074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Feb-01-2018","formattedDateTime":"Feb-01-2018T16:11:37UTC","year":2018,"month":2,"dayOfMonth":1,"monthName":"February"},"datePeriodEnds":{"dateMilliseconds":1520179897074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Mar-04-2018","formattedDateTime":"Mar-04-2018T16:11:37UTC","year":2018,"month":3,"dayOfMonth":4,"monthName":"March"},"forecastPeriodId":"a1b9ad49-6989-41da-a283-02676abdd7ab"},{"id":"bc16ad20-0237-41fc-9378-1b991305ed9d","dateCreated":{"dateMilliseconds":1522839343850,"dateFormat":"MMM-dd-yyyy","formattedDate":"Apr-04-2018","formattedDateTime":"Apr-04-2018T10:55:43UTC","year":2018,"month":4,"dayOfMonth":4,"monthName":"April"},"forecastAmount":{"value":300,"dateCurrencySaved":"2018-04-24T17:28:31Z","formattedCurrency":"$300.00","isocurrencyCode":"USD"},"currencyISOCode":"USD","poolId":"66d9bdc5-f835-4556-ac9b-df1881acb51f","poolName":"RP-JFE-17","datePeriodStarts":{"dateMilliseconds":1517501497074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Feb-01-2018","formattedDateTime":"Feb-01-2018T16:11:37UTC","year":2018,"month":2,"dayOfMonth":1,"monthName":"February"},"datePeriodEnds":{"dateMilliseconds":1520179897074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Mar-04-2018","formattedDateTime":"Mar-04-2018T16:11:37UTC","year":2018,"month":3,"dayOfMonth":4,"monthName":"March"},"forecastPeriodId":"a1b9ad49-6989-41da-a283-02676abdd7ab"},{"id":"5a8fc9bc-fe42-4942-9a06-94bc398f3f46","dateCreated":{"dateMilliseconds":1522839341247,"dateFormat":"MMM-dd-yyyy","formattedDate":"Apr-04-2018","formattedDateTime":"Apr-04-2018T10:55:41UTC","year":2018,"month":4,"dayOfMonth":4,"monthName":"April"},"forecastAmount":{"value":25,"dateCurrencySaved":"2018-04-24T17:28:31Z","formattedCurrency":"$25.00","isocurrencyCode":"USD"},"currencyISOCode":"USD","poolId":"66d9bdc5-f835-4556-ac9b-df1881acb51f","poolName":"RP-JFE-17","datePeriodStarts":{"dateMilliseconds":1517501497074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Feb-01-2018","formattedDateTime":"Feb-01-2018T16:11:37UTC","year":2018,"month":2,"dayOfMonth":1,"monthName":"February"},"datePeriodEnds":{"dateMilliseconds":1520179897074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Mar-04-2018","formattedDateTime":"Mar-04-2018T16:11:37UTC","year":2018,"month":3,"dayOfMonth":4,"monthName":"March"},"forecastPeriodId":"a1b9ad49-6989-41da-a283-02676abdd7ab"},{"id":"a2fe01b7-7e3b-4ef1-8d22-043e2c4281d6","dateCreated":{"dateMilliseconds":1522832597956,"dateFormat":"MMM-dd-yyyy","formattedDate":"Apr-04-2018","formattedDateTime":"Apr-04-2018T09:03:17UTC","year":2018,"month":4,"dayOfMonth":4,"monthName":"April"},"forecastAmount":{"value":10,"dateCurrencySaved":"2018-04-24T17:28:31Z","formattedCurrency":"$10.00","isocurrencyCode":"USD"},"currencyISOCode":"USD","poolId":"66d9bdc5-f835-4556-ac9b-df1881acb51f","poolName":"RP-JFE-17","datePeriodStarts":{"dateMilliseconds":1517501497074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Feb-01-2018","formattedDateTime":"Feb-01-2018T16:11:37UTC","year":2018,"month":2,"dayOfMonth":1,"monthName":"February"},"datePeriodEnds":{"dateMilliseconds":1520179897074,"dateFormat":"MMM-dd-yyyy","formattedDate":"Mar-04-2018","formattedDateTime":"Mar-04-2018T16:11:37UTC","year":2018,"month":3,"dayOfMonth":4,"monthName":"March"},"forecastPeriodId":"a1b9ad49-6989-41da-a283-02676abdd7ab"}]}
    const ELEMENT_DATA = data.searchResults
    this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
  }
}

export interface Element {
  id:string;
  poolName:string;
  forecastAmount: Object;
  dateCreated: Object;
}