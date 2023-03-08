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
        Schema::create('content_validations', function (Blueprint $table) {
            $table->id();
            $table->string('module_id')->foreign()->references('id')->on('modules')->onDelete('cascade');
            $table->string('status');
            $table->text('comment');
            $table->timestamp('deadline');
            $table->boolean('submitted');
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
        Schema::dropIfExists('content_validations');
    }
};
