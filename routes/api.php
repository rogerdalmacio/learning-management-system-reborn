<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\CourseManager\CMCourseController;
use App\Http\Controllers\CoreFunctions\ExamGrantingController;
use App\Http\Controllers\CoreFunctions\SubjectTaggingController;
use App\Http\Controllers\CoreFunctions\AccountCreationController;
use App\Http\Controllers\CoreFunctions\AnnouncementsController;
use App\Http\Controllers\CoreFunctions\ModuleStatusUpdateController;
use App\Http\Controllers\CourseDeveloper\CDActivity;
use App\Http\Controllers\CourseDeveloper\CDLesson;
use App\Http\Controllers\CourseDeveloper\CDQuiz;
use App\Http\Controllers\Modules\LessonController;
use App\Http\Controllers\Teacher\GradesController;
use App\Http\Controllers\Users\ProfilePictureController;
use App\Models\Students\ActivityResult;
use App\Models\Students\AutoSaveProgress;
use App\Models\Students\QuizResult;

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

//Login API

Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

//student route
Route::group(['prefix' => 'student', 'middleware' => ['auth:sanctum','abilities:Student']], function(){
    // auto save feature
    Route::apiResource('autosave', AutoSaveProgress::class);

    Route::apiResource('courses', CourseController::class);
    Route::apiResource('lesson', LessonController::class);
    Route::apiResource('activityresult', ActivityResult::class);
    Route::apiResource('quizresult', QuizResult::class);
});

//teachers route
Route::group(['prefix' => 'teacher', 'middleware' => ['auth:sanctum','abilities:Teacher']], function(){
    Route::post('/computegrade', [GradesController::class, 'computeGrades']);
});

//course developer route
Route::group(['prefix' => 'coursedeveloper', 'middleware' => ['auth:sanctum','abilities:CourseDeveloper']], function(){
    Route::apiResource('lesson', CDLesson::class);
    Route::apiResource('quiz', CDQuiz::class);
    Route::apiResource('activity', CDActivity::class);
});

//course manager route
Route::group(['prefix' => 'coursemanager', 'middleware' => ['auth:sanctum','abilities:CourseManager']], function(){
    Route::post('/createtask', [CMToDoListController::class, 'createtask']);
    Route::post('/taslist', [CMToDoListController::class, 'taskList']);
    Route::patch('/edittask', [CMToDoListController::class, 'editTask']);
    Route::post('/approvetask', [CMToDoListController::class, 'approveTask']);
    Route::delete('/deletetask', [CMToDoListController::class, 'deleteTask']);
    Route::apiResource('course', CMCourseController::class);
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
    Route::post('/batchmoduleupdatestatus', [ModuleStatusUpdateController::class, 'editModuleStatus']);
    Route::post('/createannouncement', [AnnouncementsController::class, 'createAnnouncement']);
    Route::post('/createannouncement', [AnnouncementsController::class, 'createAnnouncement']);
    Route::patch('/editannouncement', [AnnouncementsController::class, 'editAnnouncement']);
    Route::patch('/deleteannouncement', [AnnouncementsController::class, 'deleteAnnouncement']);
    Route::apiResource('examgrant', ExamGrantingController::class);
    Route::apiResource('modulestatusupdate', ModuleStatusUpdateController::class);
    Route::apiResource('tagsubject', SubjectTaggingController::class);
});

Route::group(['prefix' => 'users', 'middleware' => ['auth:sanctum']], function(){
    Route::post('/uploadprofilepicture', [ProfilePictureController::class, 'uploadProfilePicture']);
});