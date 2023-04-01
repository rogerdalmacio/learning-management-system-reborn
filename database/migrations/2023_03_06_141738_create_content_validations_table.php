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
            $table->string('module_id')->onDelete('cascade');
            $table->string('status');
            $table->json('comments');
            $table->boolean('submitted');
            $table->timestamps();
        });

        Schema::rename('content_validations', 'lms_content_validations');
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
