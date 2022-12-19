import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import { validItemsPerPage } from "../../../interfaces/book";
import { PropsComponents } from "../../../interfaces/utils";
import { styles } from "./styles";

interface OwnProps {
    value: number;
    onChange: (e: SelectChangeEvent<number>) => void;
    disabled?: boolean;
}

type Props = PropsComponents & OwnProps;

type OwnState = {
    items: Array<number>;
}

class ItemsPerPageInput extends React.Component<Props, OwnState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            items: validItemsPerPage
        }
    }

    render() {
        return (
            <FormControl>
                <InputLabel>Items per page</InputLabel>
                <Select
                    value={this.props.value as number}
                    label="Items per page"
                    onChange={this.props.onChange}
                    size={"small"}
                    className={this.props.classes.selectInput}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "center"
                          },
                          transformOrigin: {
                            vertical: "bottom",
                            horizontal: "center"
                          },
                      }}
                    disabled={this.props.disabled}
                >
                    {this.state.items.map((val, idx) => <MenuItem key={idx} value={val}>{val}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }
}

export default withStyles(styles)(ItemsPerPageInput);