
<?php

use App\Http\Controllers\Connection\AmsController;
use App\Http\Controllers\Connection\FacultyConnectionController;
use App\Http\Controllers\Connection\HrController;
use App\Http\Controllers\Connection\MisController;
use App\Http\Controllers\Connection\RegistrarController;
use Carbon\Carbon;
use App\Models\CourseRating;
use Illuminate\Support\Facades\Route;
use App\Models\CoreFunctions\Announcement;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Students\SQuizController;
use App\Http\Controllers\Teacher\GradesController;
use App\Http\Controllers\Teacher\TCourseController;
use App\Http\Controllers\Students\SCourseController;
use App\Http\Controllers\Students\SLessonController;
use App\Http\Controllers\Students\SModulesController;
use App\Http\Controllers\Students\SnapshotController;
use App\Http\Controllers\Teacher\TSnapshotController;
use App\Http\Controllers\CoreFunctions\LogsController;
use App\Http\Controllers\Students\SActivityController;
use App\Http\Controllers\Teacher\QuizAttemptController;
use App\Http\Controllers\Students\SQuizResultController;
use App\Http\Controllers\Users\ChangePasswordController;
use App\Http\Controllers\Users\ProfilePictureController;
use App\Http\Controllers\CourseManager\CMCourseDeveloper;
use App\Http\Controllers\Teacher\ListOfStudentController;
use App\Http\Controllers\CoreFunctions\FetchSharedContent;
use App\Http\Controllers\CourseDeveloper\CDQuizController;
use App\Http\Controllers\CourseManager\CMCourseController;
use App\Http\Controllers\CourseDeveloper\CDCourseController;
use App\Http\Controllers\CourseDeveloper\CDLessonController;
use App\Http\Controllers\CourseDeveloper\CDModuleController;
use App\Http\Controllers\CourseManager\CMFilteredCourseList;
use App\Http\Controllers\CourseManager\CMToDoListController;
use App\Http\Controllers\Students\SActivityResultController;
use App\Http\Controllers\Users\FetchAnnouncementsController;
use App\Http\Controllers\CoreFunctions\ListOfUsersController;
use App\Http\Controllers\Students\AutoSaveProgressController;
use App\Http\Controllers\CoreFunctions\ExamGrantingController;
use App\Http\Controllers\CourseDeveloper\CDActivityController;
use App\Http\Controllers\CourseDeveloper\CDToDoListController;
use App\Http\Controllers\CoreFunctions\AccountManageController;
use App\Http\Controllers\CoreFunctions\AnnouncementsController;
use App\Http\Controllers\CoreFunctions\PasswordResetController;
use App\Http\Controllers\CourseManager\CMEditSectionController;
use App\Http\Controllers\CourseManager\CMListOfUsersController;
use App\Http\Controllers\CoreFunctions\ListOfSubjectsController;
use App\Http\Controllers\CoreFunctions\SubjectTaggingController;
use App\Http\Controllers\CourseManager\CMCourseRatingController;
use App\Http\Controllers\CoreFunctions\AccountCreationController;
use App\Http\Controllers\CoreFunctions\ModuleStatusUpdateController;
use App\Http\Controllers\CourseManager\CourseSyllabusController;
use App\Http\Controllers\Teacher\TActivityController;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/dispatch-emails', function(){
    artisan::call('queue:work');
});

// password reset request
Route::post('/reset-password-request', [UserController::class, 'passwordResetRequest']);

// password reset
Route::get('/reset-password', [UserController::class, 'handlePasswordReset']);

//Login API
Route::post('/login', [UserController::class, 'login']);
//logout API
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
//Reset password
Route::post('/resetpassword', [UserController::class, 'passwordResetRequest']);

//student route
Route::group(['prefix' => 'student', 'middleware' => ['auth:sanctum','abilities:Student']], function(){
    // auto save feature
    Route::post('/autosave', [AutoSaveProgressController::class, 'saveProgress']);
    Route::get('/fetchautosave', [AutoSaveProgressController::class, 'fetchProgress']);
    Route::get('/fetchlogs', [AutoSaveProgressController::class, 'fetchLogs']);

    Route::apiResource('courses', SCourseController::class);
    Route::apiResource('lesson', SLessonController::class);
    Route::apiResource('activity', SActivityController::class);
    Route::apiResource('quiz', SQuizController::class);
    Route::apiResource('module', SModulesController::class);

    Route::apiResource('activityresult', SActivityResultController::class);
    Route::apiResource('quizresult', SQuizResultController::class);
    Route::post('/getquizresultid', [SQuizResultController::class, 'getQuizResultId']);
    Route::post('/getactivityresultid', [SActivityResultController::class, 'getActivityResultId']);

    Route::post('/snapshot', [SnapshotController::class, 'saveSnapshot']);

    Route::get('/announcements', [AnnouncementsController::class, 'announcement']);

    Route::get('/notification', [AnnouncementsController::class, 'notification']);
});

//teachers route
Route::group(['prefix' => 'teacher', 'middleware' => ['auth:sanctum','abilities:Teacher']], function(){

    Route::post('/deleteattempt', [QuizAttemptController::class, 'deleteAttempt']);

    Route::get('/grade', [GradesController::class, 'index']);

    Route::get('/listofstudents', [ListOfStudentController::class, 'listOfStudents']);

    Route::post('/batchchecksnapshot', [TSnapshotController::class, 'batchCheckSnapshot']);

    Route::patch('/checksnapshot/{id}', [TSnapshotController::class, 'checkSnapshot']);

    Route::patch('/rejectsnapshot/{id}', [TSnapshotController::class, 'rejectSnapshot']);

    Route::apiResource('course', TCourseController::class);

    Route::apiResource('activityresult', TActivityController::class); // submit score using patch method
    
    Route::get('/announcements', [AnnouncementsController::class, 'announcement']);

    //
    Route::patch('/faculty/approve-request/{id}', [FacultyConnectionController::class, 'approveRequest']);
    Route::get('/faculty/list-of-request', [FacultyConnectionController::class, 'listOfFacultyRequest']);
});

//course developer route
Route::group(['prefix' => 'coursedeveloper', 'middleware' => ['auth:sanctum','abilities:CourseDeveloper']], function() {

    Route::apiResource('course', CDCourseController::class);

    Route::apiResource('module', CDModuleController::class);

    Route::apiResource('lesson', CDLessonController::class);

    Route::apiResource('quiz', CDQuizController::class);

    Route::apiResource('activity', CDActivityController::class);

    Route::patch('/submittodo/{id}', [CDToDoListController::class, 'submitTodo']);

    Route::get('/announcements', [AnnouncementsController::class, 'announcement']);
});

//course manager route
Route::group(['prefix' => 'coursemanager', 'middleware' => ['auth:sanctum','abilities:CourseManager']], function(){

    Route::apiResource('course', CMCourseController::class);
    Route::apiResource('filteredcourselist', CMFilteredCourseList::class);
    Route::apiResource('coursedevelopers', CMCourseDeveloper::class);

    Route::post('/singlecoursedevelopersubjecttagging', [SubjectTaggingController::class, 'singleCourseDeveloperSubjectTagging']);

    Route::post('/createtodo', [CMToDoListController::class, 'createTodo']);
    Route::post('/edittodo/{id}', [CMToDoListController::class, 'updateTodo']);
    Route::patch('/acceptTodo/{id}', [CMToDoListController::class, 'acceptTodo']);
    Route::patch('/courseapprove/{id}', [CMToDoListController::class, 'toggleCourseApproval']);

    Route::get('/students', [ListOfUsersController::class, 'students']);
    Route::get('/teachers', [CMListOfUsersController::class, 'teacher']);

    Route::patch('/teachers/edit-year-and-sections/{id}', [CMEditSectionController::class, 'editTeacherSection']);

    Route::get('/announcements', [AnnouncementsController::class, 'announcement']);

    Route::post('/course-rating', [CMCourseRatingController::class, 'rating']);
    Route::post('/course-rating/{id}', [CMCourseRatingController::class, 'editRating']);

    Route::apiResource('course-syllabus', CourseSyllabusController::class);

    Route::post('/ams/request-cmo', [AmsController::class, 'requestCmo']);
    Route::get('/ams/list-of-request', [AmsController::class, 'listOfAmsRequest']);
});

//content routes
Route::group(['prefix' => 'content', 'middleware' => ['auth:sanctum','ability:CourseManager,Admin,Teacher']], function(){

    Route::get('/course', [FetchSharedContent::class, 'courses']);
    Route::get('/module/{id}', [FetchSharedContent::class, 'modules']);
    Route::get('/activity/{id}', [FetchSharedContent::class, 'activity']);
    Route::get('/lesson/{id}', [FetchSharedContent::class, 'lesson']);
    Route::get('/quiz/{id}', [FetchSharedContent::class, 'quiz']);

});

//SuperAdmin Core
Route::group(['prefix' => 'core', 'middleware' => ['auth:sanctum', 'abilities:SuperAdmin']], function(){

    Route::post('/batchcreatestudents', [AccountCreationController::class, 'batchCreateStudents']);
    Route::post('/batchcreateteachers', [AccountCreationController::class, 'batchCreateTeachers']);
    Route::post('/createsinglestudent', [AccountCreationController::class, 'createSingleStudent']);
    Route::post('/createsingleadmin', [AccountCreationController::class, 'createSingleAdmin']);
    Route::post('/createsinglecoursemanager', [AccountCreationController::class, 'createSingleCourseManager']);
    Route::post('/createsinglecoursedeveloper', [AccountCreationController::class, 'createSingleCourseDeveloper']);
    Route::post('/createsingleteacher', [AccountCreationController::class, 'createSingleTeacher']);

    //AccountManage
    Route::patch('/editstudent/{id}', [AccountManageController::class, 'editStudent']);
    Route::patch('/editteacher/{id}', [AccountManageController::class, 'editTeacher']);

    Route::patch('/resetpassword/{id}', [PasswordResetController::class, 'passwordReset']);

    Route::get('/announcements', [AnnouncementsController::class, 'announcement']);
    
    Route::get('/superadmin/registrar/list-of-request', [RegistrarController::class, 'listOfRegistrarRequest']);
    Route::post('/superadmin/registrar/request-student-credentials', [RegistrarController::class, 'requestStudentCredentials']);

    //Hr connection
    Route::get('/superadmin/hr/list-of-request', [HrController::class, 'listOfHrRequest']);
    Route::post('/superadmin/hr/request-hr-credentials', [HrController::class, 'requestTeacherCredentials']);
});

//Admin Core
Route::group(['prefix' => 'core', 'middleware' => ['auth:sanctum', 'abilities:Admin']], function(){

    Route::apiResource('tagsubject', SubjectTaggingController::class);
    Route::apiResource('subjects', ListOfSubjectsController::class);

    Route::get('/grantees', [ExamGrantingController::class, 'listOfGrantees']);
    Route::patch('/dropgrant/{id}', [ExamGrantingController::class, 'deleteGrant']);
    Route::post('/batchgrantexam', [ExamGrantingController::class, 'batchExamGrant']);
    Route::post('/singlegrantexam', [ExamGrantingController::class, 'singleExamGrant']);

    Route::patch('/batchmoduleupdatestatus/{id}', [ModuleStatusUpdateController::class, 'editModuleStatus']);
    Route::get('/modules', [ModuleStatusUpdateController::class, 'listOfModules']);

    Route::get('/announcements', [AnnouncementsControllersController::class, 'activeAnnouncements']);
    Route::get('/inactiveannouncements', [AnnouncementsController::class, 'inActiveAnnouncements']);
    Route::post('/createannouncement', [AnnouncementsController::class, 'createAnnouncement']);
    Route::patch('/editannouncement/{id}', [AnnouncementsController::class, 'editAnnouncement']);
    Route::patch('/deleteannouncement/{id}', [AnnouncementsController::class, 'deleteAnnouncement']);

    Route::post('/batchstudentssubjecttagging', [SubjectTaggingController::class, 'batchStudentsSubjectTagging']);
    Route::post('/batchteachersubjecttagging', [SubjectTaggingController::class, 'batchTeacherSubjectTagging']);
    Route::post('/singlestudentsubjecttagging', [SubjectTaggingController::class, 'singleStudentSubjectTagging']);
    Route::post('/singleteachersubjecttagging', [SubjectTaggingController::class, 'singleTeacherSubjectTagging']);
    Route::patch('/editcoursedevelopersubject/{id}', [SubjectTaggingController::class, 'editCourseDeveloperSubject']);
    Route::patch('/editstudentsubject/{id}', [SubjectTaggingController::class, 'editStudentSubject']);
    Route::patch('/editteachersubject/{id}', [SubjectTaggingController::class, 'editTeacherSubject']);

    Route::get('/announcements', [AnnouncementsController::class, 'announcement']);

    //MIS connection
    Route::get('/mis/list-of-request', [MisController::class, 'listOfMisRequest']);
    Route::post('/mis/request-exam-grantees', [MisController::class, 'requestExamGrantees']);

    //Registrar connection
    Route::get('/registrar/list-of-request', [RegistrarController::class, 'listOfRegistrarRequest']);
    Route::post('/registrar/request-student-subjects', [RegistrarController::class, 'requestStudentSubjects']);

    //reset password
    Route::get('resetpasswordlist', [PasswordResetController::class, 'passwordResetList']);
    Route::post('resetpassword', [PasswordResetController::class, 'passwordReset']);
});

Route::group(['prefix' => 'listofusers', 'middleware' => ['auth:sanctum', 'ability:Admin,SuperAdmin']], function(){

    //listOfUsers
    Route::get('/students', [ListOfUsersController::class, 'students']);
    Route::get('/teachers', [ListOfUsersController::class, 'teachers']);
    Route::get('/coursemanagers', [ListOfUsersController::class, 'coursemanager']);
    Route::get('/coursedevelopers', [ListOfUsersController::class, 'coursedeveloper']);
    Route::get('/admins', [ListOfUsersController::class, 'admin']);

});


Route::group(['prefix' => 'core-shared', 'middleware' => ['auth:sanctum', 'ability:Admin,SuperAdmin']], function(){

    Route::get('/logs', [LogsController::class, 'logsList']);

});

Route::group(['prefix' => 'users', 'middleware' => ['auth:sanctum']], function(){
    Route::post('/uploadprofilepicture', [ProfilePictureController::class, 'uploadProfilePicture']);
    Route::post('/changepassword', [UserController::class, 'changePassword']);
});