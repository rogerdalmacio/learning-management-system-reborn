<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quiz_results', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('student_id')->unsigned()->onDelete('cascade');
            $table->string('quiz_id');
            $table->string('module_id');
            $table->string('preliminaries');
            $table->string('quiz_type');
            $table->string('attempt');
            $table->integer('score')->nullable();
            $table->string('logs')->nullable();
            $table->boolean('snapshot')->default(false)->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time')->nullable();
            $table->integer('time_elapsed')->nullable();
            $table->timestamps();
        });

        Schema::rename('quiz_results', 'lms_quiz_results');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quiz_results');
    }
};
