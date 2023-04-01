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
        Schema::create('course_ratings', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('course_id');
            $table->tinyInteger('comprehensiveness');
            $table->tinyInteger('accuracy');
            $table->tinyInteger('readability');
            $table->string('complete');
            $table->timestamps();
        });

        Schema::rename('course_ratings', 'lms_course_ratings');
    }   

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('course_ratings');
    }
};
