import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http-service.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})

export class OrganizationComponent implements OnInit {

  dataSource: any;
  popupVisible = false;
  buttonOptions: any = {
    text: 'Register',
    type: 'success',
    useSubmitBehavior: true,
  };
  addContactBtnOption: any = {
    icon: 'plus',
    onClick: () => {
      this.formData.contacts.push({})
    }
  };
  formData = {contacts: [{}]};
  organizationTypes: any;
  contactTypes: any;
  contactUsingFor: any;

  constructor(private service: HttpService) { 
  }

  ngOnInit(): void {
    this.service.get("organization")
      .subscribe((data: any) => {
        this.dataSource = data.entry.map((x: any) => x.resource);
      })
    this.service.get("CodeSystem/organization-type")
      .subscribe((data:any) => {
        this.organizationTypes = data.concept
      })
    this.service.get("CodeSystem/contact-point-system")
      .subscribe((data:any) => {
        this.contactTypes = data.concept
      })
    this.service.get("CodeSystem/contact-point-use")
      .subscribe((data:any) => {
        this.contactUsingFor = data.concept
      })
  }

  onToolbarPreparing(e: any) {
    let toolbarItems = e.toolbarOptions.items;
    let _this = this;

    toolbarItems.push({
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Thêm mới',
        onClick: function () {
          _this.popupVisible = !_this.popupVisible
        }
      },
      location: 'before'
    })
  }

  onFormSubmit(e:any) {
    console.log(this.formData)
    e.preventDefault();
  }
}
