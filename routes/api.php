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
use App\Http\Controllers\CoreFunctions\SubjectTaggingController;
use App\Http\Controllers\CoreFunctions\AccountCreationController;
use App\Http\Controllers\CoreFunctions\ModuleStatusUpdateController;

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

    Route::post('/listofstudents', [ListOfStudentController::class, 'listOfStudents']);
    
    Route::delete('/deletequizattempt', [QuizAttemptController::class, 'deleteAttempt']);

    Route::apiResource('course', TCourseController::class);

});

//course developer route
Route::group(['prefix' => 'coursedeveloper', 'middleware' => ['auth:sanctum','abilities:CourseDeveloper']], function(){

    Route::apiResource('course', CDCourseController::class);

    Route::apiResource('module', CDModuleController::class);

    Route::apiResource('lesson', CDLessonController::class);

    Route::apiResource('quiz', CDQuizController::class);

    Route::apiResource('activity', CDActivityController::class);

});

//course manager route
Route::group(['prefix' => 'coursemanager', 'middleware' => ['auth:sanctum','abilities:CourseManager']], function(){

    Route::apiResource('course', CMCourseController::class);

    Route::post('/singlecoursedevelopersubjecttagging', [SubjectTaggingController::class, 'singleCourseDeveloperSubjectTagging']);

    Route::post('/createtask', [CMToDoListController::class, 'createtask']);
    Route::post('/taslist', [CMToDoListController::class, 'taskList']);
    Route::patch('/edittask', [CMToDoListController::class, 'editTask']);
    Route::post('/approvetask', [CMToDoListController::class, 'approveTask']);
    Route::delete('/deletetask', [CMToDoListController::class, 'deleteTask']);

});

//admin route
Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum','abilities:Admin']], function(){
        
});

//super admin route
Route::group(['prefix' => 'superadmin', 'middleware' => ['auth:sanctum','abilities:SuperAdmin']], function(){
        
});

//SuperAdmin Core
Route::group(['prefix' => 'core', 'middleware' => ['auth:sanctum', 'abilities:SuperAdmin']], function(){

    Route::post('/batchcreatestudents', [AccountCreationController::class, 'batchCreateStudents']);
    Route::post('/createsinglestudent', [AccountCreationController::class, 'createSingleStudent']);
    Route::post('/createsingleadmin', [AccountCreationController::class, 'createSingleAdmin']);
    Route::post('/createsinglecoursemanager', [AccountCreationController::class, 'createSingleCourseManager']);
    Route::post('/createsinglecoursedeveloper', [AccountCreationController::class, 'createSingleCourseDeveloper']);
    Route::post('/createsingleteacher', [AccountCreationController::class, 'createSingleTeacher']);
    
});

//Admin Core
Route::group(['prefix' => 'core', 'middleware' => ['auth:sanctum', 'abilities:Admin']], function(){

    Route::apiResource('modulestatusupdate', ModuleStatusUpdateController::class);
    Route::apiResource('tagsubject', SubjectTaggingController::class);

    Route::post('/batchgrantexam', [ExamGrantingController::class, 'batchExamGrant']);
    Route::post('/singlegrantexam', [ExamGrantingController::class, 'singleExamGrant']);

    Route::post('/batchmoduleupdatestatus', [ModuleStatusUpdateController::class, 'editModuleStatus']);
    Route::post('/createannouncement', [AnnouncementsController::class, 'createAnnouncement']);
    Route::patch('/editannouncement', [AnnouncementsController::class, 'editAnnouncement']);
    Route::delete('/deleteannouncement', [AnnouncementsController::class, 'deleteAnnouncement']);

    Route::post('/batchstudentssubjecttagging', [SubjectTaggingController::class, 'batchStudentsSubjectTagging']);
    Route::post('/batchteachersubjecttagging', [SubjectTaggingController::class, 'batchTeacherSubjectTagging']);
    Route::post('/singlestudentsubjecttagging', [SubjectTaggingController::class, 'singleStudentSubjectTagging']);
    Route::post('/singleteachersubjecttagging', [SubjectTaggingController::class, 'singleTeacherSubjectTagging']);

});

Route::group(['prefix' => 'users', 'middleware' => ['auth:sanctum']], function(){

    Route::post('/uploadprofilepicture', [ProfilePictureController::class, 'uploadProfilePicture']);
    Route::post('/changepassword', [ChangePasswordController::class, 'changePassword']);

    // Route::get('/fetchprofilepicture/{filename}', [ProfilePictureController::class, 'fetchProfilePicture']);

});