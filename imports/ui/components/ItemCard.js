import React, { PureComponent } from "react";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  IconButton,
  Hidden,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class ItemCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      labelButton,
      title,
      body,
      description,
      icon,
      hidden,
      action1,
      action2,
      action3,
      action4,
      classes,
      showX,
      image,
    } = this.props;
    return (
      <Card className={classes.card} elevation={10}>
        {showX ? (
          <CardHeader
            action={
              <IconButton aria-label="settings" onClick={action3}>
                <span style={{ fontSize: 12 }}>
                  <i className="fas fa-trash" />
                </span>
              </IconButton>
            }
          />
        ) : null}
        <CardActionArea onClick={action4}>
          <Hidden xlDown={hidden}>
            <CardMedia
              component="img"
              alt="Imagen"
              height="140"
              image={image || "/imagenes/Logoblack.png"}
              title="Image title"
            />
          </Hidden>
          <CardContent>
            <span style={{ fontSize: 64 }}>
              <i className={icon} />
            </span>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {body}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={action2}>
            {labelButton !== null ? labelButton : "Modificar"}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(useStyles)(ItemCard);
