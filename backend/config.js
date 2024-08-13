//backend/config.js
const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "top-secret";

module.exports = {
	JWT_SECRET
}