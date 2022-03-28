# Data Format

## Json Files

Each Json file represents data for a single company of a different size. "Snazzy Kangaroo Consulting" contains 100 employees, "Atlas Technology" contains 500 companies, and "Sonic Bionics" contains 2500 employees.
Each file is a single Json array containing every employee for the company. Each element in the array looks something like this:
```json
{
  "firstName" : "Nicky",
  "lastName" : "Sellers",
  "employeeId" : 2,
  "email" : "Nicky_Sellers@snazzykangarooconsulting.com",
  "companyId" : 1,
  "companyName" : "Snazzy Kangaroo Consulting",
  "managerId" : 1,
  "positionTitle" : "Engineering Manager",
  "startDate" : "2016-05-04",
  "isManager" : true,
  "password" : "sellersni"
}
```

Descriptions for each field are as follows:
- firstName: The first name of the employee
- lastName: The last name of the employee
- employeeId: Unique identifier for the employee within the company. Within a company this is guaranteed to be unique but across companies employees may have the same identifier. A combination of companyId and employeeId is guaranteed to be unique across the full data set.
- email: Email address for the employee, may be used in combination with the password for authentication
- companyId: Unique identification number for the company that this employee belongs to
- companyName: The name of the company this employee works for
- managerId: employeeId for the manager of this employee. The CEO of a company is the only employee where this field is missing, all other employees will have this field defined.
- positionTitle: The name of the position this employee holds
- startDate: What date the employee started working for the company
- isManager: A boolean field for whether this employee is a manager or not
- password: A password that can be used to log into the system as this employee

## Additional Data

The following are the initial integrations with the unified inbox. Described below is the use case as a whole, but it is ultimately up to you to determine how best to represent the request in the inbox - i.e. what belongs in the inbox item vs. what really should live in a page specific to the overall use case.

### Employee PTO Request

An employee PTO is a request from one employee sent to their manager in order to request taking some time off. The following data should be a part of the request:

To request, an employee will provide the following:
- Type: The reason for this request, can be any of: Sick time, Jury duty, vacation, or parental leave.
- Start Date: The date where the PTO will start
- End Date: The date where the PTO will end
- Notes: An optional field where the employee can add some custom additional details about the nature of the request.

A manager who receives this request can either approve or deny the request to complete their inbox item.

### Performance Review

A performance review is a request from one employee to another in order to request feedback from their peer. The following data should be a part of the request:

To request, an employee will simply select a list of their peers to send a performance review request to.

On the receiving end, employees doing a performance review would fill in the following:
- Overall comments: A place to provide a section of text on overall feedback about the employee they're reviewing.
- Growth feedback: A score (1-5) and text field for the reviewer to provide feedback on how the employee they are reviewing has grown in their role through the year.
- Kindness feedback: A score (1-5) and text field for the reviewer to provide feedback on whether the employee they are reviewing is someone they enjoy interacting with (or not).
- Delivery feedback: A score (1-5) and text field for the reviewer to provide feedback on whether the employee they are reviewing is able to deliver work in a timely, consistent, and quality manner.

An employee doing the performance review might complete part of the review and leave it for later to advance their inbox item to an "in progress" state. Once they have finished providing feedback they may submit the review in order to complete their inbox item.

### Assigned Training

An assigned training is a request from an admin within the company to all employees of the company.

To request, the admin will provide a link to the required training.

On the receiving end, employees will receive the link and complete the training outside their inbox. Once complete, the employee can acknowledge that they have completed the assigned training in order to complete their inbox item.
