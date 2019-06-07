import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, finalize, startWith, tap} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs/internal/observable/of";
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {PassCategoryComponent} from "../pass-category/pass-category.component";
import {Category} from "../_models/category.model";
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {RoboPassService} from "../_services/robo-pass.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-pass-account',
  templateUrl: './pass-account.component.html',
  styleUrls: ['./pass-account.component.scss']
})
export class PassAccountComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSource: TableMainDataSource;
    name: string;
    total: number;
    searchInput: FormControl;
    displayedColumns: string[] = ['name', 'action'];

    constructor(
        public dialog: MatDialog,
        private masterPassService: RoboPassService
    ) {
        this.searchInput = new FormControl('');
    }

    ngOnInit() {
        this.dataSource = new TableMainDataSource(this.paginator, this.sort, this.masterPassService);
        setTimeout(() => {
            this.dataSource.total.subscribe( res => this.total = res);
        })
    }

    ngAfterViewInit(): void{
        setTimeout(() => {
            this.paginator.page
                .pipe(
                    startWith(null),
                    tap(() => this.loadData())
                )
                .subscribe();

            this.searchInput.valueChanges
                .pipe(debounceTime(300), distinctUntilChanged())
                .subscribe(searchText => {
                    this.paginator.pageIndex = 0;
                    this.loadData();
                });
        });
    }

    // openDialog(): void {
    //     const dialogRef = this.dialog.open(MainDialogComponent, {
    //         width: '250px',
    //         data: {name: this.name, animal: this.animal}
    //         // data: {name: this.name, animal: this.animal}
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.animal = result;
    //     });
    // }
    //
    // doShow(): void {
    //     const dialogRef = this.dialog.open(MainDialogComponent, {
    //         width: '250px',
    //         data: {name: this.name, animal: this.animal}
    //         // data: {name: this.name, animal: this.animal}
    //     });
    // }

    loadData(): void {
        const search = this.searchInput.value;
        this.dataSource.listCategories(
            search,
            this.paginator.pageIndex,
            this.paginator.pageSize
        );
    }
}


/**
 * Data source for the TableMain view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableMainDataSource extends DataSource<any> {
    public loading = false;
    public value = new BehaviorSubject<Category[]>([]);
    public total = new BehaviorSubject<number>(0);

    constructor(
        private paginator: MatPaginator,
        private sort: MatSort,
        private masterPassService: RoboPassService
    ) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(collectionViewer: CollectionViewer): Observable<Category[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        return this.value.asObservable();
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void {
        this.value.complete();
    }

    listCategories(search='', pageNumber=0, pageSize=20): void {
        this.masterPassService.getCategories(
            search, pageNumber, pageSize
        ).pipe(
            catchError(()=>of([])),
            finalize(()=> this.loading = false)
        ).subscribe( res => {
                const value = res.values.map( category => {
                    return new Category(category);
                });
                this.value.next(value);
                this.total.next(res.total);
            }
        );
    }
}
