import React, { PureComponent } from "react";
import Typography from "@material-ui/core/Typography";

class Title extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <Typography className="title" component="h2" variant="h6" gutterBottom>
        {children}
      </Typography>
    );
  }
}

export default Title;
