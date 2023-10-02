import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  fetchAllChat,
  useSendMessage,
  updateUnreadMessage,
} from "../../actions/chatActions";

import {
  customerSpecificChat,
  messageNotificationForCustomer,
} from "../../recoilState/chatState";
import { useRoute } from "@react-navigation/native";
import { useUserState } from "../../recoilState/userState";
import { useSnackBarState } from "../../recoilState/snacbarState";
// import { Done, DoneAll, Send } from '@mui/icons-material';
import { Message } from "../../recoilState/chatState";

const ContactUs = () => {
  // chat query
  fetchAllChat();
  const [message, setMessage] = useState("");
  const { params } = useRoute();
  const customer = params as any;
  console.log(customer);
  //chat querry
  const { setSnackBar } = useSnackBarState();
  const uniqueDialogues = customerSpecificChat(customer?.customerId);

  const extractUnreadMessage = messageNotificationForCustomer(
    customer?.customerId
  );

  const { currentUser } = useUserState();

  const unreadLength = extractUnreadMessage.length;

  const handleUpdateUnread = () => {
    updateUnreadMessage(extractUnreadMessage, setSnackBar);
  };

  useEffect(() => {
    if (unreadLength > 0) {
      handleUpdateUnread();
    }
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      return;
    }

    const messageData = {
      timestamp: new Date().getTime(),
      message: message || "",
      email: customer?.email || "",
      role: customer?.role || "",
      senderType: "customer" || "",
      status: "Unread" || "",
      customerId: customer?.customerId || "",
      alignmentKey: customer?.customerId || "",
    };

    useSendMessage(messageData as Message, setSnackBar);

    setMessage("");
  };

  const bottomRef = useRef<HTMLDivElement | HTMLInputElement | null>(null);
  const lastIndex = uniqueDialogues.length - 1;
  const lastmessage = uniqueDialogues[lastIndex]?.message;

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  // }, [lastmessage]);

  if (!currentUser?.email) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Customer Service</Text>
      </View>
      {!uniqueDialogues.length && (
        <Text style={styles.welcomeText}>
          Hello {currentUser?.email.slice(0, 3)} welcome to ShopAllx customer
          support chat! 😊 How can we assist you today?
        </Text>
      )}
      <View style={styles.content}>
        {currentUser?.userId ? (
          <ScrollView
            style={styles.messages}
            contentContainerStyle={styles.messagesContainer}
            // ref={bottomRef}
          >
            {uniqueDialogues.map((data) => (
              <View
                key={data.chatId}
                style={[
                  styles.message,
                  {
                    alignSelf:
                      data.alignmentKey === currentUser?.userId
                        ? "flex-end"
                        : "flex-start",
                    backgroundColor:
                      data.alignmentKey === currentUser?.userId
                        ? "orange"
                        : "#007bff",
                  },
                ]}
              >
                <Text style={styles.messageRole}>
                  {data.role === "Admin" ? "Customer-Care" : data.role}
                </Text>
                <Text style={styles.messageText}>{data.message}</Text>
                <View style={styles.messageStatus}>
                  {/* {data.status === "Read" ? <DoneAll /> : <Done />} */}
                </View>
              </View>
            ))}
          </ScrollView>
        ) : null}

        <View style={styles.messageInput}>
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholder="Type your message..."
            style={styles.input}
          />
          <Button title="Send" onPress={handleSendMessage} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#007bff",
    padding: 16,
  },
  headerText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  welcomeText: {
    textAlign: "center",
    marginTop: 100,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  messages: {
    flexGrow: 1,
  },
  messagesContainer: {
    marginBottom: 50,
  },
  message: {
    padding: 10,
    marginVertical: 6,
    maxWidth: "70%",
    borderRadius: 8,
  },
  messageRole: {
    color: "white",
  },
  messageText: {
    color: "white",
  },
  messageStatus: {
    alignSelf: "flex-end",
  },
  messageInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default ContactUs;
