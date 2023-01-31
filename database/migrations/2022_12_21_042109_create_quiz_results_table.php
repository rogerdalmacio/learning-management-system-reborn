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
            $table->foreignId('student_id')
                ->constrained()
                ->onDelete('cascade');
            $table->string('quiz_id')->index();
            $table->string('module_id')->index();
            $table->string('preliminaries');
            $table->string('quiz_type');
            $table->string('attempt');
            $table->int('score')->nullable();
            $table->string('logs')->nullable();
            $table->boolean('snapshot')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time')->nullable();
            $table->dateTime('time_elapsed')->nullable();
            $table->timestamps();
        });
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
