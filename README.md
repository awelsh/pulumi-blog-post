The code in this repo is a representation of the code used in my corresponding Scott Logic blog post - <link here>.

I wouldn't recommend you clone this repository and use it as is. Instead, I would suggest you use the code here as reference within your own Pulumi project if necessary.

However, if you do want to try out this code as it is, you will want to bulid it in the following stages:

1. Run `pulumi up` on the backend-api/infrastrucutre project.
2. Verify that there is a 'tableName' output from this stack - use the `pulumi stack output` command.
3. Run `pulumi up` on the backend-api/gateway project.
4. Verify that there is an 'apiUrl' output from this stack.
5. Run `pulumi up` on the frontend-app/frontend project.

Note the the React app on the front end is the standard boilerplate application generated via the `create-react-app` command. It doesn't actually have any reference to the API's.

