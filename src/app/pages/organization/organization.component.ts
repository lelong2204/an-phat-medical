import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/http-service.service';
import {
	DxDataGridComponent,
	DxTreeViewComponent,
} from 'devextreme-angular';

@Component({
	selector: 'app-organization',
	templateUrl: './organization.component.html',
	styleUrls: ['./organization.component.scss']
})

export class OrganizationComponent implements OnInit {

	@ViewChild(DxTreeViewComponent, { static: false }) treeView: any;

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
			this.formData.telecom.push({})
		}
	};
	formData: any = { telecom: [{}], address: [{ country: "Việt Nam", line: [""] }] };
	organizationTypes: any;
	organizationTypeValue: string[] = [];
	contactTypes: any;
	contactUsingFor: any;
	addressUses: any;
	addressTypes: any;
	constructor(private service: HttpService) {
	}

	getOrganizationData() {
		this.service.get("organization")
			.subscribe((data: any) => {
				this.dataSource = data.entry.map((x: any) => {
					x.resource.fullUrl = x.fullUrl
					return x.resource
				});
			})
	}

	ngOnInit(): void {
		this.getOrganizationData();
		this.service.get("CodeSystem/organization-type")
			.subscribe((data: any) => {
				this.organizationTypes = data.concept
			})
		this.service.get("CodeSystem/contact-point-system")
			.subscribe((data: any) => {
				this.contactTypes = data.concept
			})
		this.service.get("CodeSystem/contact-point-use")
			.subscribe((data: any) => {
				this.contactUsingFor = data.concept
			})
		this.service.get("CodeSystem/address-use")
			.subscribe((data: any) => {
				this.addressUses = data.concept
			})
		this.service.get("CodeSystem/address-type")
			.subscribe((data: any) => {
				this.addressTypes = data.concept
			})
	}

	onToolbarPreparing(e: any) {
		let toolbarItems = e.toolbarOptions.items;
		let _this = this;

		toolbarItems.push({
			widget: 'dxButton',
			options: {
				text: 'Thêm mới',
				stylingMode: 'contained',
				type: 'success',
				onClick: function () {
					_this.popupVisible = !_this.popupVisible
				}
			},
			location: 'before'
		})
	}

	onResourceTypeChanged(e: any) {
		this.updateSelection(this.treeView && this.treeView.instance);
	}

	updateSelection(treeView: any) {
		if (!treeView) return;

		if (!this.organizationTypeValue) {
			treeView.unselectAll();
		}

		if (this.organizationTypeValue) {
			this.organizationTypeValue.forEach(((value: any) => {
				treeView.selectItem(value);
			}));
		}
	}

	onTreeViewReady(e: any) {
		this.updateSelection(e.component);
	}

	onTreeViewSelectionChanged(e: any) {
		this.organizationTypeValue = e.component.getSelectedNodeKeys();
	}

	onFormSubmit(e: any) {
		if (this.organizationTypeValue.length) {
			let types = this.organizationTypes?.filter((ot: any) => {
				return this.organizationTypeValue.includes(ot.code as string);
			})

			this.formData.type = types.map((t:any) => {return {coding: [{system: "organization-type", code: t.code, diplay: t.display}]}})
		}

		if (this.formData.partOf?.reference) {
			this.formData.partOf.display = this.dataSource.filter((x:any) => x.fullUrl === this.formData.partOf?.reference)[0].name
		}
		this.formData.resourceType = "Organization";
		this.service.post("organization", JSON.stringify(this.formData)).subscribe((data: any) => {
			this.getOrganizationData();
			this.popupVisible = !this.popupVisible;
		})
		e.preventDefault();
	}

	deleteRow (e:any) {
		console.log(e)
		this.service.delete("organization/"+e.data.id).subscribe((data:any) => {
			this.getOrganizationData();
		});
    }
}
