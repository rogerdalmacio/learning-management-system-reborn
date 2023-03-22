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
        Schema::create('auto_save_progress', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('student_id')->unsigned()->onDelete('cascade');
            $table->bigInteger('quiz_result_id')->unsigned()->onDelete('cascade');
            $table->integer('quiz_id');
            $table->string('answers')->nullable();
            $table->string('logs')->nullable();
            $table->boolean('snapshot')->nullable();
            $table->dateTime('start_time')->nullable();
            $table->dateTime('end_time')->nullable();
            $table->timestamps();   
        });

        Schema::rename('auto_save_progress', 'lms_auto_save_progress');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auto_save_progress');
    }
};
