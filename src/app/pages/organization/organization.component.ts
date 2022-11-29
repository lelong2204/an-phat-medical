import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http-service.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  public dataSource:any;

  constructor(private service: HttpService) { }

  ngOnInit(): void {
    this.service.get("organization")
      .subscribe((data:any) => {
        this.dataSource = data.entry.map((x:any) => x.resource);
      })
  }

}
