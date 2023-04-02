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
        Schema::create('faculty_connections', function (Blueprint $table) {
            $table->id();
            $table->string('request');
            $table->string('department');
            $table->string('status');
            $table->strign('file');
            $table->timestamps();
        });

        Schema::rename('faculty_connections', 'lms_faculty_connections');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('faculty_connections');
    }
};
