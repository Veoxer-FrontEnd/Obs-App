import { Component, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  intervalSubs: Subscription;
  constructor() { }

  ngOnInit() {
    // this.intervalSubs = interval(1000).subscribe(count => {
    //   console.log(count);
    //   count++;
    // });

    const intervalCustomObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        // if(count > 3){
        //   observer.error(new Error("counter greater than 3 !"));
        // }
        observer.next(count);
        if(count == 5){
          observer.complete();
        }
        count++;
      }, 1000 );
    });

    const obsMapped = intervalCustomObservable.pipe(filter((data: number) => {
      return data%2 === 0;
    }),
      map((data: number) => {
      return "Round: " + (data + 1);
    }));

    this.intervalSubs = obsMapped.subscribe(data => {  
      console.log(data);
    }, error => {
      // console.log(err.message);
      alert(error.message);
    }, () => {
      console.log('completed !')
    });

  }

  ngOnDestroy(){
    this.intervalSubs.unsubscribe();
  }

}
