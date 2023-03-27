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
        Schema::create('activity_results', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('student_id')->unsigned()->onDelete('cascade');
            $table->string('activity_id')->index();
            $table->string('module_id')->index();
            $table->string('activity_type');
            $table->string('terms');
            $table->boolean('attempt');
            $table->string('status');
            $table->string('score')->nullable();
            $table->timestamps();
        });

        Schema::rename('activity_results', 'lms_activity_results');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activity_results');
    }
};
