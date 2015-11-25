'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('manufacturers');
ApplicationConfiguration.registerModule('manufacturers.admin', ['core.admin']);
