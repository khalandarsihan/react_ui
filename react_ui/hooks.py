app_name = "react_ui"
app_title = "React Ui"
app_publisher = "Khalandar Sihan"
app_description = "React ui"
app_email = "khasihanai@gmail.com	"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "react_ui",
# 		"logo": "/assets/react_ui/logo.png",
# 		"title": "React Ui",
# 		"route": "/react_ui",
# 		"has_permission": "react_ui.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/react_ui/css/react_ui.css"
# app_include_js = "/assets/react_ui/js/react_ui.js"

# include js, css files in header of web template
# web_include_css = "/assets/react_ui/public/css/react_ui.css"
web_include_js = ["/assets/react_ui/js/react_ui/bundle.js"] 

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "react_ui/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "react_ui/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# automatically load and sync documents of this doctype from downstream apps
# importable_doctypes = [doctype_1]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "react_ui.utils.jinja_methods",
# 	"filters": "react_ui.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "react_ui.install.before_install"
# after_install = "react_ui.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "react_ui.uninstall.before_uninstall"
# after_uninstall = "react_ui.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "react_ui.utils.before_app_install"
# after_app_install = "react_ui.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "react_ui.utils.before_app_uninstall"
# after_app_uninstall = "react_ui.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "react_ui.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"react_ui.tasks.all"
# 	],
# 	"daily": [
# 		"react_ui.tasks.daily"
# 	],
# 	"hourly": [
# 		"react_ui.tasks.hourly"
# 	],
# 	"weekly": [
# 		"react_ui.tasks.weekly"
# 	],
# 	"monthly": [
# 		"react_ui.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "react_ui.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "react_ui.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "react_ui.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["react_ui.utils.before_request"]
# after_request = ["react_ui.utils.after_request"]

# Job Events
# ----------
# before_job = ["react_ui.utils.before_job"]
# after_job = ["react_ui.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"react_ui.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }


website_route_rules = [
    {"from_route": "/alerts", "to_route": "alerts"},
    {"from_route": "/bank_accounts", "to_route": "bank_accounts"},
    {"from_route": "/companies", "to_route": "companies"},
    {"from_route": "/company_details", "to_route": "company_details"},
    {"from_route": "/estimates", "to_route": "estimates"},
    {"from_route": "/estimate_details", "to_route": "estimate_details"},
    {"from_route": "/home", "to_route": "home"},
    {"from_route": "/individuals", "to_route": "individuals"},
    {"from_route": "/individual_details", "to_route": "individual_details"},
    {"from_route": "/invoices", "to_route": "invoices"},
    {"from_route": "/invoice_details", "to_route": "invoice_details"},
    {"from_route": "/legal_documents", "to_route": "legal_documents"},
    {"from_route": "/partners_contacts", "to_route": "partners_contacts"},
    {"from_route": "/payments", "to_route": "payments"},
    {"from_route": "/staff", "to_route": "staff"},
    {"from_route": "/vehicles", "to_route": "vehicles"},
    {"from_route": "/works", "to_route": "works"},
    {"from_route": "/work_details", "to_route": "work_details"},
]