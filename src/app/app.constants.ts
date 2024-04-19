const domain = window.location.hostname;
let xserverurl
if ( domain === 'localhost'){
    xserverurl = 'http://127.0.0.1:8000';
} else {
    xserverurl = 'https://biashara-fund.venturepal.africa/biashara-fund-backend';
}
export let serverurl  = xserverurl


// export let serverurl = 'http://20.102.106.83:5701';
// export let serverurl = 'http://127.0.0.1:8000';
// export let serverurl = 'https://test.youthadapt.africa/test_backend';

// ng build --configuration production

export let API_VERSION = '/api/v1/';
export let loginurl = serverurl + API_VERSION + 'acl/login';
export let reset_user_password_url = serverurl + API_VERSION + 'acl/reset-user-password';

export let list_user_roles = serverurl + API_VERSION + 'account-management/list-roles';
export let get_user_roles_url = serverurl + API_VERSION + 'account-management/list-user-roles';


// department
export let list_departments = serverurl + API_VERSION + 'department/department';
export let create_department_url = serverurl + API_VERSION + 'department/department';
export let edit_department_url = serverurl + API_VERSION + 'department/department';
export let list_department_url = serverurl + API_VERSION + 'department/department';
export let delete_department_url = serverurl + API_VERSION + 'department/department';
export let department_detail_url = serverurl + API_VERSION + 'department/department';
export let department_url = serverurl + API_VERSION + 'department/department';
export let upload_departments_url = serverurl + API_VERSION + 'department/upload';

// application
export let application_url = serverurl + API_VERSION + 'application/apply';

// submissions
export let submissions_url = serverurl + API_VERSION + 'submissions/submission';

// slt
export let slt_url = serverurl + API_VERSION + 'slt/slt';


// // mms
// export let quote_url = serverurl + API_VERSION + 'mms/quote';
// export let assign_quote_url = serverurl + API_VERSION + 'mms/assign';
// export let close_quote_url = serverurl + API_VERSION + 'mms/close-quote';


// foundation
export let sector_url = serverurl + API_VERSION + 'foundation/sector';
export let sub_sector_url = serverurl + API_VERSION + 'foundation/sub-sector';
export let directorate_url = serverurl + API_VERSION + 'foundation/directorate';
export let title_url = serverurl + API_VERSION + 'foundation/title';
export let overseer_url = serverurl + API_VERSION + 'foundation/overseer';
export let thematic_area_url = serverurl + API_VERSION + 'foundation/thematic-areas';
export let rri_goals_url = serverurl + API_VERSION + 'foundation/rri-goals';
export let team_members_url = serverurl + API_VERSION + 'foundation/team-members';
export let achievements_url = serverurl + API_VERSION + 'foundation/achievements';
export let wave_url = serverurl + API_VERSION + 'foundation/waves';
export let weekly_reports_url = serverurl + API_VERSION + 'foundation/weekly-reports';
export let workplan_url = serverurl + API_VERSION + 'foundation/workplan';
export let result_chain_url = serverurl + API_VERSION + 'foundation/results-chain';
export let evaluate_url = serverurl + API_VERSION + 'foundation/evaluation';
export let assign_evaluate_url = serverurl + API_VERSION + 'foundation/assign-evaluation';
export let boroughs_url = serverurl + API_VERSION + 'foundation/boroughs';
export let sub_counties_url = serverurl + API_VERSION + 'foundation/sub-counties';
export let wards_url = serverurl + API_VERSION + 'foundation/wards';
export let estates_url = serverurl + API_VERSION + 'foundation/estates';
export let project_sub_category_url = serverurl + API_VERSION + 'foundation/project-sub-category';
export let objective_comments_url = serverurl + API_VERSION + 'foundation/objective-comments';

// reports
export let evaluation_report_url = serverurl + API_VERSION + 'reports/evaluation';

// analytics
export let general_analytics_url = serverurl + API_VERSION + 'analytics/general';
export let budget_analytics_url = serverurl + API_VERSION + 'analytics/budget';




export let create_user_url = serverurl + API_VERSION + 'ict-support/create-user';
export let bulk_create_user_url = serverurl + API_VERSION + 'ict-support/bulk-create-user';
export let list_staff_url = serverurl + API_VERSION + 'account-management/filter-by-username';
export let swap_user_department_url = serverurl + API_VERSION + 'ict-support/swap-user-department';
export let suspend_user_url = serverurl + API_VERSION + 'ict-support/suspend-user';
export let unsuspend_user_url = serverurl + API_VERSION + 'ict-support/un-suspend-user';
export let reset_password_url = serverurl + API_VERSION + 'ict-support/reset-user-password';
export let complete_profile_url = serverurl + API_VERSION + 'ict-support/complete-profile';
export let get_user_details_url = serverurl + API_VERSION + 'account-management/get-user-details';
export let change_password_url = serverurl + API_VERSION + 'account-management/change-password';
export let users_with_role_url = serverurl + API_VERSION + 'account-management/list-users-with-role';
export let edit_user_url = serverurl + API_VERSION + 'ict-support/edit-user';




export let award_user_role_url = serverurl + API_VERSION + 'ict-support/award-role';
export let revoke_user_role_url = serverurl + API_VERSION + 'ict-support/revoke-role';


