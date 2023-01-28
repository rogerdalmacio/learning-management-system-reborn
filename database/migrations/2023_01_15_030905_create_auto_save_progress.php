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
            $table->foreignId('student_id')
                ->constrained()
                ->onDelete('cascade');
            $table->string('quiz_id')->index();
            $table->string('module_id')->index();
            $table->string('preliminaries');
            $table->string('quiz_type');
            $table->string('answers');
            $table->string('logs');
            $table->boolean('snapshot');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
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
        Schema::dropIfExists('auto_save_progress');
    }
};
