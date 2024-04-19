import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { application_url, reset_password_url, reset_user_password_url } from 'src/app/app.constants';
import { SweetalertService } from 'src/app/common-module/shared-service/sweetalerts.service';

import {GeolocationService} from '@ng-web-apis/geolocation';





@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class ApplicationComponent implements OnInit {

  public LoginForm: FormGroup;
  validation_messages: any;
  submitted: false;
  passwordFieldType: boolean;
  loginformstatus: any;
  user_email: any;
  fileData: File;
  formData  =  new FormData();
  position_obtained: boolean = false;
  showGuidelines: boolean = true;


  constructor(private toastService: ToastService, private router: Router,
     private formBuilder: FormBuilder, public appService: ApplicationService, public sweetalertService: SweetalertService,
     public loadingService: LoadingService,
     private readonly geolocation$: GeolocationService) {
    this.LoginForm = this.formBuilder.group({
      email: new FormControl('',),
      password: new FormControl('',),
    });
  }
  
  showPassword() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  current_year(){
    var date = new Date();  
    return date.getFullYear();
  }

  handleFileupload(e:any,file_name:any) {
    this.fileData = e.target.files[0];
    this.formData.append(file_name, this.fileData);
  }

  getPosition() {
      // this.geolocation$.subscribe(position => 
      //   this.set_location(position));

      this.geolocation$.subscribe((position) => {
        const location = { 
          "latitude":  position['coords']['latitude'],
          "longitude":  position['coords']['longitude'],
        }
        this.personalDetails.patchValue({"location":location});
        this.position_obtained = true;
        console.log(location)
      }, (error) => {
        this.position_obtained = false;
        console.error('Error getting location', error);
        this.sweetalertService.showAlert('Error', "Unable to verify your location. Turn on your device location and try again.", 'error');
      });
  }


  // set_location(position:any){

  // }

  personalDetails!:FormGroup;
  businessIndivual!:FormGroup;
  businessGroup!:FormGroup;
  guidelines!:FormGroup;


  showOtherOutcomeInputs:boolean =false;
  showOtherGroupActivities:boolean = false;


  // progressbar
  personal_step = false;
  businessIndividual_step = false;
  businessGroup_step = false;

  step = 1;
  // end of progressbar




  //SUB COUNTY AND WARDS
  SubCountiesList=[
    {value : "Dagoretti South", label:    "Dagoretti South"},
    {value : "Dagoretti North", label:    "Dagoretti North"},
    {value :  "Embakasi East", label: "Embakasi East"},
    {value :  "Embakasi Central", label:  "Embakasi Central"},
    {value : "Embakasi North", label:  "Embakasi North"},
    {value :  "Embakasi West", label:  "Embakasi West"},
    {value :  "Embakasi South", label:  "Embakasi South"},
    {value : "Kamukunji", label:  "Kamukunji"},
    {value :  "Kasarani", label:  "Kasarani"},
    {value : "Kibra", label:  "Kibra"},
    {value :  "Langata", label:  "Langata"},
    {value :  "Makadara", label: "Makadara"},
    {value : "Mathare", label: "Mathare"},
    {value : "Starehe", label:  "Starehe"},
    {value : "Westlands", label: "Westlands"},
    {value :  "Roysambu", label: "Roysambu"},
    {value : "Ruaraka", label: "Ruaraka"},

   ];

   WestlandsWardsList=[

    {value : "Kitisuru", label:    "Kitisuru"},
    {value :  "Parklands/Highridge", label: "Parklands/Highridge"},
    {value :  "Karura", label:  "Karura"},
    {value : "Kangemi", label:  "Kangemi"},
    {value :  "Mountain View", label:  "Mountain View"},
   ];

   EmbakasiSouthWardsList=[
    {value : "Imara Daima", label:    "Imara Daima"},
    {value :  "Kwa Njenga", label: "Kwa Njenga"},
    {value :  "Kwa Ruben", label:  "Kwa Ruben"},
    {value : "Pipeline", label:  "Pipeline"},
    {value : "Kware", label:  "Kware"},
   ];

   EmbakasiCentralWardsList=[
    {value : "Kayole North", label:    "Kayole North"},
    {value :  "Kayole Central", label: "Kayole Central"},
    {value :  "Kayole South", label:  "Kayole South"},
    {value : "Komarock", label:  "Komarock"},
    {value : "Matopeni/Spring Valley", label:  "Matopeni/Spring Valley"},
   ];

   EmbakasiEastWardsList=[
    {value : "Upper Savannah", label:    "Upper Savannah"},
    {value :  "Lower Savannah", label: "Lower Savannah"},
    {value :  "Embakasi", label:  "Embakasi"},
    {value : "Utawala", label:  "Utawala"},
    {value : "Mihango", label:  "Mihango"},
   ];

   EmbakasiWestWardsList=[
    {value : "Umoja I", label:    "Umoja I"},
    {value :  "Umoja II", label: "Umoja II"},
    {value :  "Mowlem", label:  "Mowlem"},
    {value : "Kariobangi South", label:  "Kariobangi South"},
    {value : "Maringo/Hamza", label:  "Maringo/Hamza"},
    ];

    MakadaraWardsList=[
      {value : "Viwandani", label:    "Viwandani"},
      {value :  "Harambee", label: "Harambee"},
      {value :  "Makongeni", label:  "Makongeni"},
      {value : "Pumwani", label:  "Pumwani"},
      {value : "Eastleigh North", label:  "Eastleigh North"},
     ];

     KamukunjiWardsList=[
      {value : "Eastleigh South", label:    "Eastleigh South"},
      {value :  "Airbase", label: "Airbase"},
      {value :  "California", label:  "California"},
      {value : "Ngara", label:  "Ngara"},
      {value : "Nairobi Central", label:  "Nairobi Central"},
     ];

     StareheWardsList=[
      {value : "Pangani", label:    "Pangani"},
      {value :  "Ziwani/Kariokor", label: "Ziwani/Kariokor"},
      {value :  "Landimawe", label:  "Landimawe"},
      {value : "Nairobi South", label:  "Nairobi South"},
      {value : "Hospital", label:  "Hospital"},
     ];

     MathareWardsList=[
      {value : "Mabatini", label:    "Mabatini"},
      {value :  "Huruma", label: "Huruma"},
      {value :  "Ngei", label:  "Ngei"},
      {value : "Mlango Kubwa", label:  "Mlango Kubwa"},
      {value : "Kiamaiko", label:  "Kiamaiko"},
     ];

   EmbakasiNorthWardsList=[
    {value : "Kariobangi North", label:    "Kariobangi North"},
    {value :  "Dandora Area I", label: "Dandora Area I"},
    {value :  "Dandora Area II", label:  "Dandora Area II"},
    {value : "Dandora Area III", label:  "Dandora Area III"},
    {value : "Dandora Area IV", label:  "Dandora Area IV"},

   ];

   DagorettiNorthWardsList=[

    {value : "Gatina", label:    "Gatina"},
    {value :  "Kilimani", label: "Kilimani"},
    {value :  "Kawangware", label:  "Kawangware"},
    {value : "Kileleshwa", label:  "Kileleshwa"},
    {value :  "Kabiro", label:  "Kabiro"},

   ];

   DagorettiSouthWardsList=[
    {value : "Mutu-ini", label:    "Mutu-ini"},
    {value :  "Ngando", label: "Ngando"},
    {value :  "Riruta", label:  "Riruta"},
    {value : "Uthiru/Ruthi", label:  "Uthiru/Ruthi"},
    {value :  "Waithaka", label:  "Waithaka"},

    ];

    LangataWardsList=[

    {value : "Karen", label:    "Karen"},
    {value :  "Nairobi West", label: "Nairobi West"},
    {value :  "Riruta", label:  "Riruta"},
    {value : "Mugumu-Ini", label:  "Mugumu-Ini"},
    {value :  "South C", label:  "South C"},
    {value :  "Nyayo Highrise", label:  "Nyayo Highrise"},
    ];

    KibraWardsList=[
      {value : "Laini saba", label:    "Laini saba"},
      {value :  "Lindi Makina", label: "Lindi Makina"},
      {value :  "Woodley /Kenyatta Golf Course", label:  "Woodley /Kenyatta Golf Course"},
      {value : "Sarangombe", label:  "Sarangombe"},
    ];

    RoysambuWardsList=[
      {value : "Githurai", label:    "Githurai"},
      {value :  "Kahawa West", label: "Kahawa West"},
      {value :  "Zimmerman", label:  "Zimmerman"},
      {value : "Roysambu", label:  "Roysambu"},
      {value : "Kahawa", label:  "Kahawa"},
    ];

    KasaraniWardsList=[
    {value : "Clay City", label:    "Clay City"},
    {value :  "Mwiki", label: "Mwiki"},
    {value :  "Kasarani", label:  "Kasarani"},
    {value : "Njiru", label:  "Njiru"},
    {value : "Ruai", label:  "Ruai"},
    ];

    RuarakaWardsList=[
    {value : "Baba Dogo", label:    "Baba Dogo"},
    {value :  "Utalii", label: "Utalii"},
    {value :  "Mathare North", label:  "Mathare North"},
    {value : "Lucky Summer", label:  "Lucky Summer"},
    {value : "Korogocho", label:  "Korogocho"},
    ];


  //CHECKBOXES FOR GROUP ACTIVTIES & BUSINESS OUTCOMES
  groupActivitiesOptions =[
    { id: 'carWash', name: 'Car Wash' },
    { id: 'metalWorks', name: 'Metal works/ Furniture' },
    { id: 'fishMongering', name: 'Fish mongering' },
    { id: 'healthCare', name: 'Health Care' },
    { id: 'wasteRecyclers', name: 'Waste recyclers/ CBOs' },
    { id: 'tailoringBasketMaking', name: 'Tailoring/ Basket Making' },
    { id: 'hawking', name: 'Hawking' },
    { id: 'juiceMaking', name: 'Juice making' },
    { id: 'salonNail', name: 'Salon/ nail salon' },
    { id: 'chickenFarming', name: 'Chicken farming' },
    { id: 'Mechanics', name: 'Mechanics' },
    { id: 'shoeShiners', name: 'Shoe shiners' },
    { id: 'catering', name: 'Catering' },
    { id: 'bodaboda', name: 'Boda Boda' },
    { id: 'leatherShoeMakers', name: 'Leather Shoe makers' },
    { id: 'cleaningServices', name: 'Cleaning services' },
    { id: 'artAndEntertainment', name: 'Arts and Entertainment' },
    { id: 'dayCare', name: 'Day care' },
    { id: 'masonry', name: 'Masonry' },
    { id: 'textile', name: 'Textile' },
    { id: 'juakali', name: 'Jua Kali' },
    { id: 'generalMerchandise', name: 'General Merchandise' },
    { id: 'otherGroupActivities', name: 'Other:' },
  ]

  businessOutcomeOptions =[
    { id: 'increasedCapital', name: 'Increased working capital' },
    { id: 'accessToCustomers', name: 'Access to more customers' },
    { id: 'enhancedBusiness', name: 'Enhanced business/ entrepreneurial skill' },
    { id: 'businessIncome', name: 'Increased business income' },
    { id: 'employmentOpportunities', name: 'More employment opportunities' },
    { id: 'betterLivelihood', name: 'Better livelihood' },
    { id: 'otherThingsExpected', name: 'Other:' },
  ]

 
  
  ngOnInit(){
    this.guidelines = this.formBuilder.group({});
   
    
    

    this.personalDetails =this.formBuilder.group({
      fullName: ['',],
      identificationNumber:['',],
      gender:['', ],
      other_gender:['',],
      disabilityStatus:['',],
      ageGroup:['',],
      email:['',],
      phoneNumber:['',],
      passportPhoto:['',],
      nationalIDPhoto:['',],
      location:['',],
    });

    this.personalDetails.get('gender')?.valueChanges.subscribe(value=>{
      if (value !== 'other') {
        this.personalDetails.get('other_gender')?.setValue('');
      }
    });

    this.businessIndivual=this.formBuilder.group({
      businessName:['',],
      businessPermitNumber:['',],
      licenseNumber:['',],
      licensePhoto:['',],
      isbusinessRegistered:['',],
      registrationCertificate:['',],
      individualRegCertNo:['',],
      explainWhy:['',],
      subcounty:['',],
      ward:['',],
      building:['',],
      street:['',],
      landmark:['',],
      businessSector:['',],
      natureofBusiness:['',],
      rawMaterials:['',],
      sourceOfProducts:['',],
      transportProducts:['',],
      numbofEmployees:['',],
      lengthofOperations:['',],
      challenges:['',],
      otherChallenges:['',],
      awareofProgram:['',],
      sourceofCapital:['',],
      otherCapital:['',],
      capitalisAdequate:['',],
      marketingProducts:['',],
      targetMarket:['',],
      participatedintradefair:['',],
      tradefairParticipation:['',],
      capacityBuildingTraining:['',],
      capacityTrainingParticipation:['',],
      
      
    });


    this.businessIndivual.get('isbusinessRegistered')?.valueChanges.subscribe(value=>{
      if (value !== 'yes') {
        this.businessIndivual.get('registrationCertificate')?.setValue('');
      }else{
        this.businessIndivual.get('explainWhy')?.setValue('');
      }
    });

    this.businessIndivual.get('sourceofCapital')?.valueChanges.subscribe(value=>{
      if(value !== 'other'){
        this.businessIndivual.get('otherCapital')?.setValue('');
      }
    });



   this.businessIndivual.get('challenges')?.valueChanges.subscribe(value=>{
     if(value !== 'other'){
       this.businessIndivual.get('otherChallenges')?.setValue('');
     }
   });

   this.businessIndivual.get('participatedintradefair')?.valueChanges.subscribe(value=>{
    if(value !== 'no'){
      this.businessIndivual.get('tradefairParticipation')?.setValue('');
    }
  });

  this.businessIndivual.get('capacityBuildingTraining')?.valueChanges.subscribe(value=>{
    if(value !== 'no'){
      this.businessIndivual.get('capacityTrainingParticipation')?.setValue('');
    }
  });



    this.businessGroup=this.formBuilder.group({
      isGroupRegistered:['',],
      groupName:['',],
      year_registered:['',],
      subcountyGroup:['',],
      wardGroup:['',],
      GroupBuilding:['',],
      GroupStreet:['',],
      GroupLandmark:['',],
      chairpersonsContact:['',],
      numberofGroupmemb:['',],
      listOfGroupmembers:['',],
      groupConsitution:null,
      groupRegCert:null,
      groupRegCertNo:['',],

      // checkbox1
      groupActivities:[[]],
      othergroupActivites:['',],
      //checkbox2
      expectations:[[]],
      otherExpectations:['',],
      comments:['',],

    })

    this.businessGroup.get('isGroupRegistered')?.valueChanges.subscribe(value=>{
      if(value !== 'no'){
        this.businessGroup.get(['groupName', 'year_registered','subcountyGroup','GroupBuilding',
        'GroupStreet','GroupLandmark','chairpersonsContact', 'numberofGroupmemb', 'listOfGroupmembers',
        'groupConsitution', 'groupRegCert','groupRegCertNo', 'groupActivities' ])?.setValue('');
      }
    });

  
  }
  applyGuidelinesblur() {
    // Hide guidelines and show the main form
    this.showGuidelines = false;
  }

  onExpectationChange(selectedValues: any[]) {
    this.showOtherOutcomeInputs = selectedValues.includes('otherThingsExpected');
    if (!this.showOtherOutcomeInputs) {
      this.businessGroup.get('otherExpectation')?.reset(); // Reset the other expectation input field
    }
  }

  onGroupActivitiesChange(selectedValues: any[]){
    this.showOtherGroupActivities = selectedValues.includes('otherGroupActivities');
    if (!this.showOtherGroupActivities) {
      this.businessGroup.get('otherGroupActivities')?.reset(); // Reset the other expectation input field
    }
    
  }



  // progressbar functionality
  get personal() {
    return this.personalDetails.controls;
  }

  get address() {
    return this.businessIndivual.controls;
  }

  get membership() {
    return this.businessGroup.controls;
  }



next(){
  if (this.step == 1) {
    this.personal_step = true;
    // if (this.personalDetails.invalid) {
    //   return;
    // }
    this.step++;
  }else if(this.step ==2){
    this.businessIndividual_step=true;
    this.step++;
  }else{
    this.businessGroup_step =true;
  }
}

previous(){
  this.step--;
    if (this.step == 1) {
      this.personal_step = false;
    }
    if (this.step == 2) {
      this.businessGroup_step = false;
    }
}




navigateToOtherComponent() {
  this.router.navigate(['/terms-and-conditions'], { state: { step: this.step } });
  console.log(this.router.navigate(['/terms-and-conditions'], { state: { step: this.step } }));
}





  onSubmit(){

    // if (!this.position_obtained) {
    //   this.sweetalertService.showAlert('Error', "Unidentified Location. Click Share my Location button to to verify location before proceeding!", 'error');
    //   return
    // }
  //   if (!this.businessIndivual.get('termsandconditions')?.value) {
  //     this.sweetalertService.showAlert('Error', "Please accept the terms and conditions before submitting the application.", 'error');
  //     return;
  // }

    const payload = {
      "bio_data": this.personalDetails.value,
      "individual": this.businessIndivual.value,
      "organization": this.businessGroup.value,
    }
    this.formData.append('payload',JSON.stringify(payload));


    //sending data to the backend
    this.sweetalertService.showConfirmation('Confirmation', 'Do you wish to proceed submitting application?').then((res) => {
    if (res) {
      this.loadingService.showloading();
      this.appService.postrecord(application_url,this.formData).subscribe({
        next: (res:any)=>{
          // console.log(res);
          this.loadingService.hideloading();
          // this.toastService.showToastNotification('success', 'Application Submitted Successfully', 'Success 😊');
          this.sweetalertService.showAlert('Success 😊', "Application Submitted Successfully", 'success');
          this.businessIndivual.reset();
          this.businessGroup.reset();
          this.personalDetails.reset();
        },
        error:(e:any) =>console.error(e)
      })
      }
    });


 
    // console.log('Business (Individual):', this.businessIndivual.value);
    // console.log('Business (Group/Organization):', this.businessGroup.value);
    // console.log('Personal Details:', this.personalDetails.value);

  }


}
