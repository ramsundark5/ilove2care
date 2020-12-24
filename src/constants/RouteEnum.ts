export enum RouteEnum {
    DASHBOARD = '/tabs/dashboard',
    DASHBOARD_CREDIT_VIEW = '/tabs/dashboard/credits/:creditId',

    ABOUT = '/about',
    ABOUT_TAB = '/tabs/about',
    TABS = '/tabs',

    LOGIN = '/login',
    LOGOUT = '/logout',

    ACCOUNT = '/tabs/account',
    CHANGE_PASSWORD = '/tabs/account/changePassword',
    PROFILE = '/tabs/account/profile',
    SKILLS = '/tabs/account/skills',

    ADMIN = '/tabs/admin',
    ADMIN_USERS = '/tabs/admin/users',
    ADMIN_USER_SAVE = '/tabs/admin/users/:id',

    PROJECT = '/tabs/admin/project',
    PROJECT_ADD = '/tabs/admin/project/save',
    PROJECT_SAVE = '/tabs/admin/project/save/:id',

    CREDITS = '/tabs/admin/projects/:projectId/credits',
    CREDIT_ADD = '/tabs/admin/projects/:projectId/credits/save',
    CREDIT_SAVE = '/tabs/admin/projects/:projectId/credits/save/:creditId',

    TIMESHEET = '/tabs/timesheet',
    TIMESHEET_ADD = '/tabs/timesheet/save',
    TIMESHEET_SAVE = '/tabs/timesheet/save/:id',
}
