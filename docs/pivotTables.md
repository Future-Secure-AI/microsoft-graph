# Pivot Tables

As of the time of writing, the Graph API does not support creating or modifying pivot tables. Consequently, this SDK does not include pivot table support. Additionally, most Excel manipulation libraries do not provide robust support for pivot tables. If you require pivot table functionality, your options are limited to the following:

* **Use a pre-designed template**: Create an Excel template with a pivot table, upload it to SharePoint (possibly using this SDK), and modify it using the Graph API.
* **Explore specialized Excel libraries**: Some commercial Excel libraries offer pivot table support, but they typically require a paid license.
* **Manually edit the workbook's XML**: This involves directly manipulating the XML structure of the workbook locally.

In summary: There are no straightforward solutions for working with pivot tables via the Graph API or this SDK. If possible, it is recommended to avoid relying on pivot tables.