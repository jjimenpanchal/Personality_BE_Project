import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  imgs: {
    height: 300,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    // borderRadius: 10,
    // width:/
  },
});

export default function About_card(props) {
  const classes = useStyles();

  return (
    <div className="about_card">
      {console.log(props)}
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Profile Photo"
            // height="400"
            className={classes.imgs}
            image={props.img}
            title="Profile Photo"
          />
          <CardContent>
            <Typography
              className="text-center"
              gutterBottom
              variant="h5"
              component="h2"
            >
              {props.name}
            </Typography>
            {/* <h6 className="text-center ">{props.pos}</h6> */}
            <Typography
              className="text-center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {props.about}
              {/* Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica */}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="justify-content-center">
          <Button
            target="_blank"
            href={props.link}
            size="small"
            color="primary"
          >
            LinkedIn
          </Button>
          {/* <Button size="small" color="primary">
            Learn More */}
          {/* </Button> */}
        </CardActions>
      </Card>
    </div>
  );
}
