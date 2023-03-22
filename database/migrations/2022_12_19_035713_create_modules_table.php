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
        Schema::create('modules', function (Blueprint $table) {
            $table->string('id')->primary()->unique();
            $table->bigInteger('course_id')->unsigned()->onDelete('cascade');
            $table->string('title');
            $table->string('week');
            $table->boolean('status');
            $table->boolean('approval')->default(0);
            $table->timestamps();
        });

        
        Schema::rename('modules', 'lms_modules');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('modules');
    }
};
