"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import type { ContractData } from "@/lib/contracts/contract-template";
import { formatDate } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: 120,
    fontFamily: "Helvetica-Bold",
  },
  value: {
    flex: 1,
  },
  signature: {
    marginTop: 50,
  },
  signatureLine: {
    borderTop: "1px solid black",
    width: 200,
    marginTop: 40,
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 10,
  },
});

interface ContractPDFProps {
  data: ContractData;
}

export function ContractPDF({ data }: ContractPDFProps) {
  return (
    <PDFViewer className="w-full h-full">
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>DJ Services Contract</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Parties</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Client:</Text>
              <Text style={styles.value}>{data.clientName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Company:</Text>
              <Text style={styles.value}>M10 DJ Company</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>65 Stewart Rd, Eads, Tennessee 38028</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Details</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Event Name:</Text>
              <Text style={styles.value}>{data.eventName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Event Type:</Text>
              <Text style={styles.value}>{data.eventType}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{formatDate(data.eventDate)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Time:</Text>
              <Text style={styles.value}>{`${data.startTime} - ${data.endTime}`}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Venue:</Text>
              <Text style={styles.value}>{data.venueName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{data.venueAddress}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Total Amount:</Text>
              <Text style={styles.value}>
                ${data.totalAmount.toLocaleString()}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Retainer:</Text>
              <Text style={styles.value}>
                ${data.retainerAmount.toLocaleString()}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Balance Due:</Text>
              <Text style={styles.value}>
                ${data.remainingBalance.toLocaleString()}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Due Date:</Text>
              <Text style={styles.value}>{formatDate(data.paymentDueDate)}</Text>
            </View>
          </View>

          <View style={styles.signature}>
            <View style={{ marginBottom: 40 }}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Client Signature</Text>
              <Text style={styles.signatureLabel}>{data.clientName}</Text>
              <Text style={styles.signatureLabel}>Date: </Text>
            </View>

            <View>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>M10 DJ Company</Text>
              <Text style={styles.signatureLabel}>Ben Murray, Manager</Text>
              <Text style={styles.signatureLabel}>Date: </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}