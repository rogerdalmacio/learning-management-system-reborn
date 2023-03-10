<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Students\SQuizController;
use App\Http\Controllers\Teacher\GradesController;
use App\Http\Controllers\Teacher\TCourseController;
use App\Http\Controllers\Students\SCourseController;
use App\Http\Controllers\Students\SLessonController;
use App\Http\Controllers\Students\SModulesController;
use App\Http\Controllers\Students\SnapshotController;
use App\Http\Controllers\Students\SActivityController;
use App\Http\Controllers\Teacher\QuizAttemptController;
use App\Http\Controllers\Students\SQuizResultController;
use App\Http\Controllers\Users\ChangePasswordController;
use App\Http\Controllers\Users\ProfilePictureController;
use App\Http\Controllers\CourseManager\CMCourseDeveloper;
use App\Http\Controllers\Teacher\ListOfStudentController;
use App\Http\Controllers\CourseDeveloper\CDQuizController;
use App\Http\Controllers\CourseManager\CMCourseController;
use App\Http\Controllers\CourseDeveloper\CDCourseController;
use App\Http\Controllers\CourseDeveloper\CDLessonController;
use App\Http\Controllers\CourseDeveloper\CDModuleController;
use App\Http\Controllers\CourseManager\CMToDoListController;
use App\Http\Controllers\Students\SActivityResultController;
use App\Http\Controllers\Students\AutoSaveProgressController;
use App\Http\Controllers\CoreFunctions\ExamGrantingController;
use App\Http\Controllers\CourseDeveloper\CDActivityController;
use App\Http\Controllers\CoreFunctions\AnnouncementsController;
use App\Http\Controllers\CoreFunctions\ListOfSubjectsController;
use App\Http\Controllers\CoreFunctions\SubjectTaggingController;
use App\Http\Controllers\CoreFunctions\AccountCreationController;
use App\Http\Controllers\CoreFunctions\AccountManageController;
use App\Http\Controllers\CoreFunctions\ListOfUsersController;
use App\Http\Controllers\CoreFunctions\LogsController;
use App\Http\Controllers\CoreFunctions\ModuleStatusUpdateController;
use App\Http\Controllers\CoreFunctions\PasswordResetController;
use App\Http\Controllers\CourseDeveloper\CDToDoListController;
use App\Http\Controllers\CourseManager\CMFilteredCourseList;
use App\Http\Controllers\Teacher\TSnapshotController;

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

Route::get('/test', function() {
    $carbonHour1 = Carbon::createFromFormat('Y-m-d H:i:s', '2022-01-01 10:00:10');
    $carbonHour2 = Carbon::createFromFormat('Y-m-d H:i:s', '2022-01-01 12:00:00');

    $diffInSeconds = $carbonHour1->diffInSeconds($carbonHour2);

    $minutes = floor($diffInSeconds / 60);
    $seconds = $diffInSeconds % 60;

    return $minutes . ':' . $seconds;
});

//Login API
Route::post('/login', [UserController::class, 'login']);
//logout API
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

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

    Route::post('/snapshot', [SnapshotController::class, 'saveSnapshot']);

});

//teachers route
Route::group(['prefix' => 'teacher', 'middleware' => ['auth:sanctum','abilities:Teacher']], function(){

    Route::post('/computegrade', [GradesController::class, 'computeGrades']);

    Route::get('/listofstudents', [ListOfStudentController::class, 'listOfStudents']);

    Route::patch('/checksnapshot/{id}', [TSnapshotController::class, 'checkSnapshot']);

    Route::delete('/rejectsnapshot/{id}', [TSnapshotController::class, 'rejectSnapshot']);
    
    Route::delete('/deletequizattempt/{id}', [QuizAttemptController::class, 'deleteAttempt']);

    Route::apiResource('course', TCourseController::class);

});

//course developer route
Route::group(['prefix' => 'coursedeveloper', 'middleware' => ['auth:sanctum','abilities:CourseDeveloper']], function() {

    Route::apiResource('course', CDCourseController::class);

    Route::apiResource('module', CDModuleController::class);

    Route::apiResource('lesson', CDLessonController::class);

    Route::apiResource('quiz', CDQuizController::class);

    Route::apiResource('activity', CDActivityController::class);

    Route::patch('/submittodo/{id}', [CDToDoListController::class, 'submitTodo']);

});

//course manager route
Route::group(['prefix' => 'coursemanager', 'middleware' => ['auth:sanctum','abilities:CourseManager']], function(){

    Route::apiResource('course', CMCourseController::class);
    Route::apiResource('filteredcourselist', CMFilteredCourseList::class);
    Route::apiResource('coursedevelopers', CMCourseDeveloper::class);

    Route::post('/singlecoursedevelopersubjecttagging', [SubjectTaggingController::class, 'singleCourseDeveloperSubjectTagging']);

    Route::post('/createtodo', [CMToDoListController::class, 'createTodo']);
    Route::patch('/moduleapprove/{id}', [CMToDoListController::class, 'moduleApproval']);
    Route::patch('/courseapprove/{id}', [CMToDoListController::class, 'toggleCourseApproval']);

    Route::get('/students', [ListOfUsersController::class, 'students']);

});


//content routes
Route::group(['prefix' => 'content', 'middleware' => ['auth:sanctum','ability:CourseManager,Admin']], function(){

    Route::apiResource('courses', SCourseController::class);
    Route::apiResource('lesson', SLessonController::class);
    Route::apiResource('activity', SActivityController::class);
    Route::apiResource('quiz', SQuizController::class);
    Route::apiResource('module', SModulesController::class);

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
    
});

//Admin Core
Route::group(['prefix' => 'core', 'middleware' => ['auth:sanctum', 'abilities:Admin']], function(){
    
    Route::apiResource('tagsubject', SubjectTaggingController::class);
    Route::apiResource('subjects', ListOfSubjectsController::class);

    Route::get('/grantees', [ExamGrantingController::class, 'listOfGrantees']);
    Route::delete('/dropgrant/{id}', [ExamGrantingController::class, 'deleteGrant']);
    Route::post('/batchgrantexam', [ExamGrantingController::class, 'batchExamGrant']);
    Route::post('/singlegrantexam', [ExamGrantingController::class, 'singleExamGrant']);

    Route::patch('/batchmoduleupdatestatus/{id}', [ModuleStatusUpdateController::class, 'editModuleStatus']);
    Route::get('/modules', [ModuleStatusUpdateController::class, 'listOfModules']);

    Route::get('/announcements', [AnnouncementsController::class, 'activeAnnouncements']);
    Route::get('/inactiveannouncements', [AnnouncementsController::class, 'inActiveAnnouncements']);
    Route::post('/createannouncement', [AnnouncementsController::class, 'createAnnouncement']);
    Route::patch('/editannouncement/{id}', [AnnouncementsController::class, 'editAnnouncement']);
    Route::delete('/deleteannouncement/{id}', [AnnouncementsController::class, 'deleteAnnouncement']);

    Route::post('/batchstudentssubjecttagging', [SubjectTaggingController::class, 'batchStudentsSubjectTagging']);
    Route::post('/batchteachersubjecttagging', [SubjectTaggingController::class, 'batchTeacherSubjectTagging']);
    Route::post('/singlestudentsubjecttagging', [SubjectTaggingController::class, 'singleStudentSubjectTagging']);
    Route::post('/singleteachersubjecttagging', [SubjectTaggingController::class, 'singleTeacherSubjectTagging']);
    Route::patch('/editcoursedevelopersubject/{id}', [SubjectTaggingController::class, 'editCourseDeveloperSubject']);
    Route::patch('/editstudentsubject/{id}', [SubjectTaggingController::class, 'editStudentSubject']);
    Route::patch('/editteachersubject/{id}', [SubjectTaggingController::class, 'editTeacherSubject']);

});

Route::group(['prefix' => 'listofusers', 'middleware' => ['auth:sanctum', 'ability:Admin,SuperAdmin']], function(){

    //listOfUsers
    Route::get('/students', [ListOfUsersController::class, 'students']);
    Route::get('/teachers', [ListOfUsersController::class, 'teachers']);
    Route::get('/coursemanagers', [ListOfUsersController::class, 'coursemanager']);
    Route::get('/coursedevelopers', [ListOfUsersController::class, 'coursedeveloper']);

});

Route::group(['prefix' => 'core-shared', 'middleware' => ['auth:sanctum', 'ability:Admin,SuperAdmin']], function(){

    Route::get('/logs', [LogsController::class, 'logsList']);

});

Route::group(['prefix' => 'users', 'middleware' => ['auth:sanctum']], function(){

    Route::post('/uploadprofilepicture', [ProfilePictureController::class, 'uploadProfilePicture']);
    Route::post('/changepassword', [ChangePasswordController::class, 'changePassword']);

    // Route::get('/fetchprofilepicture/{filename}', [ProfilePictureController::class, 'fetchProfilePicture']);

});