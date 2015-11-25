'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('toys');
ApplicationConfiguration.registerModule('toys.admin', ['core.admin']);
//ApplicationConfiguration.registerModule('toys.admin.routes', ['core.admin.routes']);