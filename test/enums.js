const endpoints = {
    HOME : '/',
    PROJECT : '/projects',
    DEVELOPERSHUB : '/developer',
    WORKFLOWS : '/workflows',
    PUBLISHED : '/published',
    EDIT : '/draft',
    LOGS : '/logs',
    PLUGIN : '/plugin',
    PLUGINAUTH : '/auth',
    ACTION : '/action',
    EMBED : '/embedProjects'
}

const stepIndex = {
    API : 0,
    IF : 1,
    VARIABLE : 2,
    COMMENT : 3,
    RESPONSE : 4,
    FUNCTION : 4
}

const apiIndex = {
    GET : 0,
    POST : 1, 
    PUT : 2,
    DELETE : 3,
    PATCH : 4
}

module.exports = {endpoints , stepIndex , apiIndex};