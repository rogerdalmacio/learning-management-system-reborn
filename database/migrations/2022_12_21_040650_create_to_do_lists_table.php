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
        // Schema::create('to_do_lists', function (Blueprint $table) {
        //     $table->id();
        //     $table->foreignId('course_developer_id')
        //         ->constrained()
        //         ->onDelete('cascade');
        //     $table->foreignId('course_id')
        //         ->unsigned()
        //         ->onDelete('cascade');
        //     $table->string('title');
        //     $table->string('message');
        //     $table->string('status');
        //     $table->timestamps();
        // });

        // Schema::rename('to_do_lists', 'lms_to_do_lists');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('to_do_lists');
    }
};
