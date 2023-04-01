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
        Schema::create('course_syllabi', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('course_id')->unsigned()->onDelete('cascade');
            $table->string('week1');
            $table->string('week2');
            $table->string('week3');
            $table->string('week4');
            $table->string('week5');
            $table->string('week6');
            $table->string('week7');
            $table->string('week8');
            $table->string('week9');
            $table->string('week10');
            $table->string('week11');
            $table->string('week12');
            $table->string('week13');
            $table->string('week14');
            $table->string('week15');
            $table->string('week16');
            $table->string('week17');
            $table->string('week18');
            $table->string('week19')->nullable();
            $table->string('week20')->nullable();
            $table->string('week21')->nullable();
            $table->string('week22')->nullable();
            $table->string('week23')->nullable();
            $table->string('week24')->nullable();
            $table->timestamps();
        });

        Schema::rename('course_syllabi', 'lms_course_syllabi');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('course_syllabi');
    }
};
