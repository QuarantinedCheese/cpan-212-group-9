# Art-Browser

Group #9
* Ethan Pothier - QuarantinedCheese
* Kristine May Garcia - kristinemayg-lgtm
* Autumn Gun-Munro - bloodleafpuddle


# Running steps

## 1. Environment Prep
To have both API server and web server running together, first make sure that both the /web and /api have their respective `.env` files. 

If the file is blank, copy the contents of the `.example.env` to get the default parameters. Next, make sure that the web's `API_ORIGIN` port matches the API's `PORT` variable.

By default, the API port is `4000`. The web API `API_ORIGIN` is `http://localhost:4000` by default.

## 2. Run Servers
Navigate to the respective /api or /web for each.
Use `npm run dev` to run the API and WEB server. Make sure to leave the terminal open for both servers. 

If any issues persist, double check environment variables.

# M3 Walkthrough
https://youtu.be/hnUw5Ov5w4M
