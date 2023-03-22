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
        Schema::create('examination_grants', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('student_id')->unsigned()->onDelete('cascade');
            $table->boolean('grant');
            $table->string('preliminaries');
            $table->dateTime('granted_at');
        });

        Schema::rename('examination_grants', 'lms_examination_grants');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('examination_grants');
    }
};
