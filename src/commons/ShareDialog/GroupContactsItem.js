import React, { useCallback } from "react";
import {
  makeStyles,
  Avatar,
  Switch,
  ListItemAvatar,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import { useTranslate } from "react-admin";
import GroupIcon from "@material-ui/icons/Group";
import { arrayFromLdField } from "../../utils";

/** @typedef {import("./ShareDialog").InvitationState} InvitationState */

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  primaryText: {
    width: "30%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexBasis: "100%",
  },
  secondaryText: {
    textAlign: "center",
    width: "60%",
    fontStyle: "italic",
    color: "grey",
  },
  avatarItem: {
    minWidth: 50,
  },
  avatar: {
    backgroundImage: `radial-gradient(circle at 50% 3em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  },
}));

/**
 * @param {Object} props
 * @param {import("react-admin").Record} props.group
 * @param {Record<string, InvitationState} props.invitations
 * @param {(invitations: Record<string, InvitationState>) => void} props.onChange
 * @param {boolean} props.isOrganizer
 */
const GroupContactsItem = ({ group, onChange, invitations, isOrganizer }) => {
  const classes = useStyles();
  const translate = useTranslate();

  const groupMemberIds = arrayFromLdField(group?.["vcard:hasMember"]);

  const viewChecked = groupMemberIds.every(
    (memberId) =>
      invitations[memberId]?.canView || invitations[memberId]?.canShare
  );
  const shareChecked = groupMemberIds.every(
    (memberId) => invitations[memberId]?.canShare
  );
  const viewSwitchReadonly = groupMemberIds.every(
    (memberId) =>
      invitations[memberId]?.viewReadonly ||
      invitations[memberId]?.shareReadonly
  );
  const shareSwitchReadonly = groupMemberIds.every(
    (memberId) => invitations[memberId]?.shareReadonly
  );

  const switchShare = useCallback(() => {
    // Create invitation object for every group member.
    const newInvitations = Object.fromEntries(
      groupMemberIds
        .map((memberId) => {
          if (invitations[memberId]?.shareReadonly) {
            return [undefined, undefined];
          } else {
            const newShareState = !shareChecked;
            return [
              memberId,
              {
                ...invitations[memberId],
                canShare: newShareState,
                canView: newShareState || viewChecked,
              },
            ];
          }
        })
        .filter(([key, val]) => key && val)
    );
    onChange(newInvitations);
  }, [shareChecked, viewChecked, invitations, onChange, groupMemberIds]);

  const switchView = useCallback(() => {
    // Create invitation object for every group member.
    const newInvitations = Object.fromEntries(
      groupMemberIds
        .map((memberId) => {
          if (invitations[memberId]?.viewReadonly) {
            return [undefined, undefined];
          } else {
            const newViewState = !viewChecked;
            return [
              memberId,
              {
                ...invitations[memberId],
                canView: newViewState,
                canShare: newViewState && shareChecked,
              },
            ];
          }
        })
        .filter(([key, val]) => key && val)
    );
    onChange(newInvitations);
  }, [viewChecked, shareChecked, invitations, onChange, groupMemberIds]);

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar className={classes.avatarItem}>
        <Avatar src={group?.["vcard:photo"]} className={classes.avatar}>
          <GroupIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.primaryText}
        primary={group?.["vcard:label"]}
      />
      <ListItemText
        className={classes.secondaryText}
        primary={translate("app.permission.view")}
        secondary={
          <Switch
            size="small"
            checked={viewChecked}
            disabled={viewSwitchReadonly || !group}
            onClick={switchView}
          />
        }
      />
      {isOrganizer && (
        <ListItemText
          className={classes.secondaryText}
          primary={translate("app.permission.share")}
          secondary={
            <Switch
              size="small"
              checked={shareChecked}
              disabled={shareSwitchReadonly || !group}
              onClick={switchShare}
            />
          }
        />
      )}
    </ListItem>
  );
};

export default GroupContactsItem;
