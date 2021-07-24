<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    Route::post("/login", [AuthController::class, 'login']);
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post("/logout", [AuthController::class, 'logout']);
        Route::prefix('user')->group(function () {
            Route::get("/", [UserController::class, 'index']);
            //webhook cadastro de usuario
            Route::post("/", [UserController::class, 'store'])->middleware('verifyUserType');
            Route::get("/{id}", [UserController::class, 'show']);
            Route::put("/{id}", [UserController::class, 'update']);
            Route::delete("/{id}", [UserController::class, 'destroy'])->middleware('verifyUserType');
        });

    });
});
