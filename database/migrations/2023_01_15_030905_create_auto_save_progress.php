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
            $table->foreignId('quiz_result_id')
                ->constrained()
                ->onDelete('cascade');
            $table->string('answers')->nullable();
            $table->string('logs')->nullable();
            $table->boolean('snapshot')->nullable();
            $table->dateTime('start_time')->nullable();
            $table->dateTime('end_time')->nullable();
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
