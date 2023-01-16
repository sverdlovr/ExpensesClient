import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { EntryService } from '../entry.service';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { EntryElement } from './interfaces/EntryElement';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})


export class EntriesComponent implements OnInit {
  
  displayedColumns: string[] = ['Description', 'IsExpense', 'Value', 'Actions'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service:EntryService, private dialog:MatDialog){}

  ngOnInit(): void{
    this.service.getAll().subscribe((data)=>{
      //console.log('Result - ', data );
      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[])
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  updateEntry(entry){
    console.log(entry)
    this.dialog.open(UpdateEntryComponent,{
      data:{
        Id:entry.Id,
        Descrption: entry.Description,
        IsExpense: entry.IsExpense,
        Value: entry.Value
      }
    } )
  }
}
