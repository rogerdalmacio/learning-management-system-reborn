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
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->string('module_id')->onDelete('cascade');
            $table->string('preliminaries');
            $table->string('quiz_type');
            $table->text('questions');
            $table->text('answers');
            $table->text('options');
            $table->timestamps();
        });

        Schema::rename('quizzes', 'lms_quizzes');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quizzes');
    }
};
