<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('students', function (Blueprint $table) {
            $table->id()->startingValue(10000000);
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->integer('year_and_section');
            $table->string('major')->nullable();
            $table->string('department');
            $table->string('program');
            $table->string('subjects')->nullable();
            $table->boolean('is_logged_in')->default(0);
            $table->timestamps(); // created and upated the user
            $table->rememberToken();
        });

        Schema::rename('students', 'lms_students');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
};
