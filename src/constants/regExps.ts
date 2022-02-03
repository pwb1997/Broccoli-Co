// reference https://emailregex.com/
export const EMAIL_REGEXP =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const AT_LEAST_THREE_REGEXP = /.{3,}/;

export const START_WITH_LETTER_REGEXP = /^[a-zA-Z]/;

export const VALID_CHARS_REGEXP = /[a-zA-Z0-9_-]*/;
