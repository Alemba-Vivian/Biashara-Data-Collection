import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import {

  serverurl,
  submissions_url,
  users_with_role_url

} from '../../../app.constants';
import { DataTableDirective } from 'angular-datatables';
import { AdministrationService } from 'src/app/administration/services/administration.service';
@Component({
  selector: 'app-view-quote',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class DetailApplicationComponent implements OnInit {
  public createRecordForm: FormGroup;
  public editRecordForm: FormGroup;
  public AssignRecordForm: FormGroup;
  public processRecordForm: FormGroup;
  validation_messages: any;
  formSubmitted = false;
  tenant_tag: string;
  deletereferenceid: any;
  selectedRow: any;
  selectedAll: boolean = false;
  fileData: File;
  fileData2: File;
  formData  =  new FormData();
  serverurl = serverurl

  private modalRef: NgbModalRef;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('assignModal') public assignModal: ModalDirective;
  @ViewChild('processModal') public processModal: ModalDirective;
  @ViewChild('approveRequestModal') public approveRequestModal: ModalDirective;
  record: any = [];
  searchString: string;
  previous: string | null;
  departments: any;
  users: any;
  request_id: any;

  constructor(public administrationService: AdministrationService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal, private loadingService: LoadingService,
    private router: Router, public toastService: ToastService,
    public sweetalertService: SweetalertService, private route: ActivatedRoute,) {
    this.selectedRow = [];
    this.createRecordForm = this.formBuilder.group({
      subject: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required])),
      content: new FormControl('',),
    });
    this.editRecordForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required])),
      employee_no: new FormControl('', Validators.compose([Validators.required])),
      position: new FormControl('', Validators.compose([Validators.required])),
    });
    this.AssignRecordForm = this.formBuilder.group({
      traveler: new FormControl('', Validators.compose([Validators.required])),
      budget_code: new FormControl('', Validators.compose([Validators.required])),
    });
    this.processRecordForm = this.formBuilder.group({
      traveler: new FormControl('', Validators.compose([Validators.required])),
      bill_settlement: new FormControl('', Validators.compose([Validators.required])),
    });

    let request_id = this.route.snapshot.paramMap.get('id');
    if (request_id){
      this.request_id = request_id
      this.fetchRecords(request_id);  
    }

    // BACK BUTTON
    let current_url = String(window.location.pathname )
    const current = localStorage.getItem('current');
    this.previous = current;
    if (current){
      localStorage.setItem('previous',current)
      localStorage.setItem('current',current_url)
    } else {
      localStorage.setItem('current',current_url)
    }

  }
  ngOnInit(): void {

  }

  back_btn(){
    this.router.navigate([this.previous]);
  }

  openPopup(content:any, type:any) {

    this.ngbModal.open(content);

  }

  closeAllPopups() {
    this.modalRef.close();

  }
  resetForm() {
    this.createRecordForm.reset();
    this.formSubmitted = false;
  }

  set_request_id(request_id:any){
    this.AssignRecordForm.patchValue({"traveler":request_id})
    this.processRecordForm.patchValue({"traveler":request_id})
  }

  fetchRecords(request_id:any) {
    this.loadingService.showloading();
    const params = {
      "request_id": request_id
    };
    this.administrationService.getrecords(submissions_url, params).subscribe((res:any) => {
      this.record = res;

      this.loadingService.hideloading();
    });
  }

  editRecord(index:any='') {
    delete this.record?.trip?.id;
    let combined = {...this.record, ...this.record?.trip}
    this.editRecordForm.patchValue(combined);
    this.editRecordForm.patchValue({"salary_amount_required": combined?.salary_advance?.amount});

    this.editModal.show();
  }


  deleteInstanceRecord(id:any) {
    console.log(id)
    const filter_params = {
      'request_id': id
    };
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed deleting record? This process is irreversible').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.deleterecord(submissions_url, filter_params).subscribe((res) => {

            this.toastService.showToastNotification('success', 'Successfully Deleted', '');
            this.fetchRecords(this.request_id);
          });
        }
      });

  }

  saveEditChanges() {
    // console.log(this.editRecordForm.value)
    if (this.editRecordForm.invalid) {
      this.administrationService.markFormAsDirty(this.editRecordForm);
      this.toastService.showToastNotification('error', 'Invalid form', 'Error')
    } else {
      
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed updating request?').then((res) => {
        if (res) {
          const payload = this.editRecordForm.value

          // this.destroyTable();
          this.loadingService.showloading();
          this.administrationService.updaterecord(submissions_url, payload).subscribe((data) => {
            if (data) {
              this.fetchRecords(this.request_id);
              this.toastService.showToastNotification('success', 'Successfully Updated', '');
              this.editRecordForm.reset();
              this.editModal.hide();
              this.loadingService.hideloading();
            }

          });
        }
      });

    }
  }

  handleFileupload(e:any) {
    this.fileData = e.target.files[0];
  }



}
